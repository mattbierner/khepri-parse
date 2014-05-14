/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/parser.kep'
 * DO NOT EDIT
*/
"use strict";
var parse = require("bennu")["parse"],
    __o = require("nu-stream")["stream"],
    __o0 = require("khepri-ast")["position"],
    __o1 = require("./program_parser"),
    parserStream, ParserPosition, parseInput, parseStream, ParserState = parse["ParserState"],
    filter = __o["filter"],
    isEmpty = __o["isEmpty"],
    first = __o["first"],
    streamFrom = __o["from"],
    SourcePosition = __o0["SourcePosition"],
    program = __o1["program"];
(parserStream = filter.bind(null, (function(x) {
    switch (x.type) {
        case "Whitespace":
        case "LineTerminator":
        case "Comment":
            return false;
        default:
            return true;
    }
})));
(ParserPosition = (function(tokenPosition, sourcePosition, prevEnd) {
    var self = this;
    (self.tokenPosition = tokenPosition);
    (self.sourcePosition = sourcePosition);
    (self.prevEnd = prevEnd);
}));
(ParserPosition.prototype = new(parse.Position)());
(ParserPosition.prototype.constructor = ParserPosition);
(ParserPosition.initial = new(ParserPosition)(parse.Position.initial, SourcePosition.initial, parse.Position.initial));
(ParserPosition.prototype.increment = (function(tok, r) {
    var self = this;
    return new(ParserPosition)(self.tokenPosition.increment(tok), (isEmpty(r) ? tok.loc.end : first(r)
        .loc.start), tok.loc.end);
}));
(ParserPosition.prototype.toString = (function() {
    var self = this;
    return ("" + self.sourcePosition);
}));
(ParserPosition.prototype.compare = (function(pos) {
    var self = this;
    return self.tokenPosition.compare(pos.tokenPosition);
}));
(parseStream = (function(s) {
    return parse.runState(program, new(ParserState)(parserStream(s), ParserPosition.initial));
}));
(parseInput = (function(z) {
    var s = streamFrom(z);
    return parse.runState(program, new(ParserState)(parserStream(s), ParserPosition.initial));
}));
(exports["parserStream"] = parserStream);
(exports["ParserPosition"] = ParserPosition);
(exports["parseInput"] = parseInput);
(exports["parseStream"] = parseStream);