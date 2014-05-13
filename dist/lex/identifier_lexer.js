/*
 * THIS FILE IS AUTO GENERATED from 'lib/lex/identifier_lexer.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/text", "nu-stream/stream", "./reserved_word_lexer"], (function(
    require, exports, __o, __o0, __o1, __o2) {
    "use strict";
    var zwnj, zwj, unicodeLetter, unicodeDigit, unicodeConnectorPunctuation, identifierStart, identifierPart,
            identifierParts, identifierName, identifier, always = __o["always"],
        attempt = __o["attempt"],
        bind = __o["bind"],
        cons = __o["cons"],
        choice = __o["choice"],
        either = __o["either"],
        fail = __o["fail"],
        many = __o["many"],
        label = __o["label"],
        character = __o0["character"],
        oneOf = __o0["oneOf"],
        digit = __o0["digit"],
        letter = __o0["letter"],
        foldl = __o1["foldl"],
        reservedWordList = __o2["reservedWordList"],
        __add = (function(x, y) {
            return (x + y);
        }),
        join = foldl.bind(null, __add, "");
    (zwnj = character("‌"));
    (zwj = character("‍"));
    (unicodeLetter = letter);
    (unicodeDigit = digit);
    (unicodeConnectorPunctuation = oneOf(["_", "‿", "⁀", "⁔", "︳", "︴", "﹍", "﹎", "﹏", "＿"]));
    (identifierStart = either(letter, oneOf("$_")));
    (identifierPart = choice(attempt(identifierStart), digit, unicodeConnectorPunctuation, zwnj, zwj));
    (identifierParts = many(identifierPart));
    (identifierName = cons(identifierStart, identifierParts));
    (identifier = label("Identifier Lexer", bind(identifierName, (function(name) {
        var n = join(name);
        return ((reservedWordList.indexOf(n) >= 0) ? fail() : always(n));
    }))));
    (exports["zwnj"] = zwnj);
    (exports["zwj"] = zwj);
    (exports["unicodeLetter"] = unicodeLetter);
    (exports["unicodeDigit"] = unicodeDigit);
    (exports["unicodeConnectorPunctuation"] = unicodeConnectorPunctuation);
    (exports["identifierStart"] = identifierStart);
    (exports["identifierPart"] = identifierPart);
    (exports["identifierParts"] = identifierParts);
    (exports["identifierName"] = identifierName);
    (exports["identifier"] = identifier);
}));