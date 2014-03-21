/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/boolean_lexer.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    always = __o["always"],
    either = __o["either"],
    next = __o["next"],
    label = __o["label"],
    __o0 = require("bennu")["text"],
    string = __o0["string"],
    trueLiteral, falseLiteral, booleanLiteral;
(trueLiteral = label("True Literal Lexer", next(string("true"), always(true))));
(falseLiteral = label("False Literal Lexer", next(string("false"), always(false))));
(booleanLiteral = label("Boolean Literal Lexer", either(trueLiteral, falseLiteral)));
(exports["trueLiteral"] = trueLiteral);
(exports["falseLiteral"] = falseLiteral);
(exports["booleanLiteral"] = booleanLiteral);