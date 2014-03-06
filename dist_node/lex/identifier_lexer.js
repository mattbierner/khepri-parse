/*
 * THIS FILE IS AUTO GENERATED from 'lib/lex/identifier_lexer.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("bennu")["parse"],
    always = __o["always"],
    attempt = __o["attempt"],
    bind = __o["bind"],
    cons = __o["cons"],
    choice = __o["choice"],
    either = __o["either"],
    eof = __o["eof"],
    fail = __o["fail"],
    many = __o["many"],
    never = __o["never"],
    next = __o["next"],
    label = __o["label"],
    testStream = __o["testStream"],
    token = __o["token"],
    __o0 = require("bennu")["text"],
    character = __o0["character"],
    oneOf = __o0["oneOf"],
    digit = __o0["digit"],
    letter = __o0["letter"],
    string = __o0["string"],
    __o1 = require("nu-stream")["stream"],
    foldl = __o1["foldl"],
    __o2 = require("./reserved_word_lexer"),
    reservedWordList = __o2["reservedWordList"],
    zwnj, zwj, unicodeLetter, unicodeDigit, unicodeConnectorPunctuation, unicodeCombiningMark, identifierStart,
        identifierPart, identifierParts, identifierName, identifier, join = foldl.bind(null, (function(x, y) {
            return (x + y);
        }), "");
(zwnj = character("‌"));
(zwj = character("‍"));
(unicodeLetter = letter);
(unicodeDigit = digit);
(unicodeConnectorPunctuation = oneOf(["_", "‿", "⁀", "⁔", "︳", "︴", "﹍", "﹎", "﹏", "＿"]));
(unicodeCombiningMark = never());
(identifierStart = either(unicodeLetter, oneOf("$_")));
(identifierPart = choice(attempt(identifierStart), unicodeCombiningMark, unicodeDigit, unicodeConnectorPunctuation,
    zwnj, zwj));
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
(exports["unicodeCombiningMark"] = unicodeCombiningMark);
(exports["identifierStart"] = identifierStart);
(exports["identifierPart"] = identifierPart);
(exports["identifierParts"] = identifierParts);
(exports["identifierName"] = identifierName);
(exports["identifier"] = identifier);