/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/parser_position.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("nu-stream")["stream"],
    __o0 = require("bennu")["parse"],
    __o1 = require("khepri-ast")["position"],
    ParserPosition, isEmpty = __o["isEmpty"],
    first = __o["first"],
    Position = __o0["Position"],
    SourcePosition = __o1["SourcePosition"];
(ParserPosition = (function(tokenPosition, sourcePosition, prevEnd) {
    var self = this;
    (self.tokenPosition = tokenPosition);
    (self.sourcePosition = sourcePosition);
    (self.prevEnd = prevEnd);
}));
(ParserPosition.prototype = new(Position)());
(ParserPosition.prototype.constructor = ParserPosition);
(ParserPosition.initial = new(ParserPosition)(Position.initial, SourcePosition.initial, Position.initial));
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
(module.exports = ParserPosition);