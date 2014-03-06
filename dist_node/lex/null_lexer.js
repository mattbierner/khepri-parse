/*
 * THIS FILE IS AUTO GENERATED from 'lib/lex/null_lexer.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("bennu")["parse"],
    always = __o["always"],
    next = __o["next"],
    label = __o["label"],
    __o0 = require("bennu")["text"],
    string = __o0["string"],
    nullLiteral;
(nullLiteral = label("Null Lexer", next(string("null"), always(null))));
(exports["nullLiteral"] = nullLiteral);