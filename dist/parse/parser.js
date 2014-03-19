/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/parser.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "nu-stream/stream", "khepri-ast/position", "./program_parser"], (function(
    require, exports, parse, __o, __o0, __o1) {
    "use strict";
    var ParserState = parse["ParserState"],
        filter = __o["filter"],
        isEmpty = __o["isEmpty"],
        first = __o["first"],
        streamFrom = __o["from"],
        SourceLocation = __o0["SourceLocation"],
        SourcePosition = __o0["SourcePosition"],
        program = __o1["program"],
        parserStream, ParserPosition, parseInput, parseStream;
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
    (ParserPosition.initial = new(ParserPosition)(parse.Position.initial, SourcePosition.initial, parse.Position
        .initial));
    (ParserPosition.prototype.increment = (function(tok, r) {
        var self = this;
        return new(ParserPosition)(self.tokenPosition.increment(tok), (isEmpty(r) ? tok.loc.end : first(
                r)
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
    (parseInput = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(parseStream, streamFrom));
    (exports["parserStream"] = parserStream);
    (exports["ParserPosition"] = ParserPosition);
    (exports["parseInput"] = parseInput);
    (exports["parseStream"] = parseStream);
}));