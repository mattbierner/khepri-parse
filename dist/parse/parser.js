/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "nu-stream/stream", "./program_parser", "./parser_position"], (function(
    require, exports, __o, __o0, __o1, ParserPosition) {
    "use strict";
    var parserStream, parseInput, parseStream, ParserState = __o["ParserState"],
        runState = __o["runState"],
        filter = __o0["filter"],
        streamFrom = __o0["from"],
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
    (parseStream = (function(s) {
        return runState(program, new(ParserState)(parserStream(s), ParserPosition.initial));
    }));
    (parseInput = (function(z) {
        var s = streamFrom(z);
        return runState(program, new(ParserState)(parserStream(s), ParserPosition.initial));
    }));
    (exports["parserStream"] = parserStream);
    (exports["parseInput"] = parseInput);
    (exports["parseStream"] = parseStream);
}));