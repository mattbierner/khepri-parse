/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/regular_expression_lexer.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "bennu/text", "./common", "./identifier_lexer",
    "./line_terminator_lexer"
], (function(require, exports, __o, __o0, __o1, __o2, __o3, __o4) {
    "use strict";
    var regularExpressionNonTerminator, regularExpressionBackslashSequence, regularExpressionClassChar,
            regularExpressionClassChars, regularExpressionClass, regularExpressionChar, regularExpressionChars,
            regularExpressionFirstChar, regularExpressionFlags, regularExpressionBody, regularExpressionLiteral,
            always = __o["always"],
        anyToken = __o["anyToken"],
        binds = __o["binds"],
        choice = __o["choice"],
        cons = __o["cons"],
        either = __o["either"],
        enumeration = __o["enumeration"],
        many = __o["many"],
        map = __o["map"],
        next = __o["next"],
        not = __o["not"],
        label = __o["label"],
        between = __o0["between"],
        character = __o1["character"],
        noneOf = __o1["noneOf"],
        join = __o2["join"],
        identifierPart = __o3["identifierPart"],
        lineTerminator = __o4["lineTerminator"];
    (regularExpressionNonTerminator = next(not(lineTerminator), anyToken));
    (regularExpressionBackslashSequence = next(character("\\"), map((function(y) {
        return ("\\" + y);
    }), regularExpressionNonTerminator)));
    (regularExpressionClassChar = either(next(not(lineTerminator), noneOf("]\\")),
        regularExpressionBackslashSequence));
    (regularExpressionClassChars = many(regularExpressionClassChar));
    (regularExpressionClass = between(character("["), character("]"), map((function(body) {
        return (("[" + body) + "]");
    }), join(regularExpressionClassChars))));
    (regularExpressionFirstChar = choice(next(not(lineTerminator), noneOf("*\\`[")),
        regularExpressionBackslashSequence, regularExpressionClass));
    (regularExpressionChar = choice(next(not(lineTerminator), noneOf("\\`[")),
        regularExpressionBackslashSequence, regularExpressionClass));
    (regularExpressionChars = many(regularExpressionChar));
    (regularExpressionFlags = many(identifierPart));
    (regularExpressionBody = cons(regularExpressionFirstChar, regularExpressionChars));
    (regularExpressionLiteral = label("Regular Expression Lexer", binds(enumeration(between(character("`"),
        character("`"), join(regularExpressionBody)), join(regularExpressionFlags)), (function(body,
        flags) {
        return always(new(RegExp)(body, flags));
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
}));