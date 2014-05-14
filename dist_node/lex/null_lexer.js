/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/null_lexer.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("bennu")["text"],
    nullLiteral, always = __o["always"],
    next = __o["next"],
    label = __o["label"],
    string = __o0["string"];
(nullLiteral = label("Null Lexer", next(string("null"), always(null))));
(exports["nullLiteral"] = nullLiteral);