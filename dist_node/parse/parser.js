/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/parser.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("nu-stream")["stream"],
    __o1 = require("./program_parser"),
    ParserPosition = require("./parser_position"),
    parserStream, parseInput, parseStream, ParserState = __o["ParserState"],
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