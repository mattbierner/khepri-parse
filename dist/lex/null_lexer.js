/*
 * THIS FILE IS AUTO GENERATED from 'lib/lex/null_lexer.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/text"], (function(require, exports, __o, __o0) {
    "use strict";
    var always = __o["always"],
        next = __o["next"],
        label = __o["label"],
        string = __o0["string"],
        nullLiteral;
    (nullLiteral = label("Null Lexer", next(string("null"), always(null))));
    (exports["nullLiteral"] = nullLiteral);
}));