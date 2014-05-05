/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/regular_expression_lexer.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    always = __o["always"],
    attempt = __o["attempt"],
    bind = __o["bind"],
    binds = __o["binds"],
    choice = __o["choice"],
    cons = __o["cons"],
    either = __o["either"],
    enumeration = __o["enumeration"],
    many = __o["many"],
    map = __o["map"],
    next = __o["next"],
    label = __o["label"],
    token = __o["token"],
    test = __o["test"],
    __o0 = require("bennu")["lang"],
    between = __o0["between"],
    __o1 = require("bennu")["text"],
    character = __o1["character"],
    __o2 = require("nu-stream")["stream"],
    foldl = __o2["foldl"],
    __o3 = require("./identifier_lexer"),
    identifierPart = __o3["identifierPart"],
    __o4 = require("./line_terminator_lexer"),
    lineTerminator = __o4["lineTerminator"],
    regularExpressionNonTerminator, regularExpressionBackslashSequence, regularExpressionClassChar,
        regularExpressionClassChars, regularExpressionClass, regularExpressionChar, regularExpressionChars,
        regularExpressionFirstChar, regularExpressionFlags, regularExpressionBody, regularExpressionLiteral, __add = (
            function(x, y) {
                return (x + y);
            }),
    join = foldl.bind(null, __add, ""),
    y;
(regularExpressionNonTerminator = token(((y = test.bind(null, lineTerminator)), (function(z) {
    var x = y(z);
    return (!x);
}))));
(regularExpressionBackslashSequence = next(character("\\"), map((function(y0) {
    return ("\\" + y0);
}), regularExpressionNonTerminator)));
(regularExpressionClassChar = either(attempt(token((function(tok) {
    return (((!test(lineTerminator, tok)) && (tok !== "]")) && (tok !== "\\"));
}))), regularExpressionBackslashSequence));
(regularExpressionClassChars = many(regularExpressionClassChar));
(regularExpressionClass = between(character("["), character("]"), map((function(body) {
    return (("[" + join(body)) + "]");
}), regularExpressionClassChars)));
(regularExpressionFirstChar = choice(token((function(tok) {
    return (((((!test(lineTerminator, tok)) && (tok !== "*")) && (tok !== "\\")) && (tok !== "`")) && (
        tok !== "["));
})), regularExpressionBackslashSequence, regularExpressionClass));
(regularExpressionChar = choice(token((function(tok) {
    return ((((!test(lineTerminator, tok)) && (tok !== "\\")) && (tok !== "`")) && (tok !== "["));
})), regularExpressionBackslashSequence, regularExpressionClass));
(regularExpressionChars = many(regularExpressionChar));
(regularExpressionFlags = many(identifierPart));
(regularExpressionBody = map(join, cons(regularExpressionFirstChar, regularExpressionChars)));
(regularExpressionLiteral = label("Regular Expression Lexer", binds(enumeration(between(character("`"), character("`"),
    regularExpressionBody), regularExpressionFlags), (function(body, flags) {
    return always(new(RegExp)(body, join(flags)));
}))));
(exports["regularExpressionNonTerminator"] = regularExpressionNonTerminator);
(exports["regularExpressionBackslashSequence"] = regularExpressionBackslashSequence);
(exports["regularExpressionClassChar"] = regularExpressionClassChar);
(exports["regularExpressionClassChars"] = regularExpressionClassChars);
(exports["regularExpressionClass"] = regularExpressionClass);
(exports["regularExpressionChar"] = regularExpressionChar);
(exports["regularExpressionChars"] = regularExpressionChars);
(exports["regularExpressionFirstChar"] = regularExpressionFirstChar);
(exports["regularExpressionFlags"] = regularExpressionFlags);
(exports["regularExpressionBody"] = regularExpressionBody);
(exports["regularExpressionLiteral"] = regularExpressionLiteral);