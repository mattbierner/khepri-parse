/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/null_lexer.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/text"], (function(require, exports, __o, __o0) {
    "use strict";
    var nullLiteral, always = __o["always"],
        next = __o["next"],
        label = __o["label"],
        string = __o0["string"];
    (nullLiteral = label("Null Lexer", next(string("null"), always(null))));
    (exports["nullLiteral"] = nullLiteral);
}));