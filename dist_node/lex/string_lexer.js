/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/string_lexer.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("bennu")["text"],
    __o1 = require("bennu")["lang"],
    __o2 = require("./line_terminator_lexer"),
    __o3 = require("./number_lexer"),
    __o4 = require("./common"),
    doubleQuote, escape, singleQuote, lineContinuation, unicodeEscapeSequence, hexEscapeSequence,
        characterEscapeSequence, escapeSequence, singleStringCharacter, singleStringCharacters, singleStringLiteral,
        doubleStringCharacter, doubleStringCharacters, doubleStringLiteral, stringLiteral, always = __o["always"],
    attempt = __o["attempt"],
    choice = __o["choice"],
    either = __o["either"],
    many = __o["many"],
    map = __o["map"],
    not = __o["not"],
    next = __o["next"],
    sequence = __o["sequence"],
    label = __o["label"],
    anyToken = __o["anyToken"],
    character = __o0["character"],
    oneOf = __o0["oneOf"],
    noneOf = __o0["noneOf"],
    between = __o1["between"],
    times = __o1["times"],
    lineTerminatorSequence = __o2["lineTerminatorSequence"],
    lineTerminator = __o2["lineTerminator"],
    decimalDigit = __o3["decimalDigit"],
    hexDigit = __o3["hexDigit"],
    join = __o4["join"],
    x, fromCharCode = map.bind(null, (function(x) {
        return String.fromCharCode(parseInt(x, 16));
    }));
(doubleQuote = character("\""));
(singleQuote = character("'"));
(escape = character("\\"));
(lineContinuation = sequence(escape, lineTerminatorSequence, always("")));
var singleEscapeCharacter = oneOf("\"'\\bfnrtv")
    .map(((x = ({
        "\"": "\"",
        "'": "'",
        "\\": "\\",
        "b": "\b",
        "f": "\f",
        "n": "\n",
        "r": "\r",
        "t": "\t",
        "v": "\u000b"
    })), (function(y) {
        return x[y];
    }))),
    escapeCharacter = choice(singleEscapeCharacter, decimalDigit, oneOf("ux")),
    nonEscapeCharacter = sequence(not(escapeCharacter), not(lineTerminator), anyToken);
(hexEscapeSequence = next(character("x"), fromCharCode(join(times(2, hexDigit)))));
(unicodeEscapeSequence = next(character("u"), fromCharCode(join(times(4, hexDigit)))));
(characterEscapeSequence = either(singleEscapeCharacter, nonEscapeCharacter));
(escapeSequence = choice(characterEscapeSequence, sequence(character("0"), not(decimalDigit), always("\u0000")),
    hexEscapeSequence, unicodeEscapeSequence));
(singleStringCharacter = label("Single String Character", choice(attempt(lineContinuation), next(escape, escapeSequence),
    next(not(lineTerminator), noneOf("'\\")))));
(singleStringCharacters = many(singleStringCharacter));
(singleStringLiteral = label("Single String Literal", between(singleQuote, singleQuote, join(singleStringCharacters))));
(doubleStringCharacter = choice(attempt(lineContinuation), next(escape, escapeSequence), next(not(lineTerminator),
    noneOf("\"\\"))));
(doubleStringCharacters = many(doubleStringCharacter));
(doubleStringLiteral = label("Double String Literal", between(doubleQuote, doubleQuote, join(doubleStringCharacters))));
(stringLiteral = label("Sting Literal Lexer", either(singleStringLiteral, doubleStringLiteral)));
(exports["doubleQuote"] = doubleQuote);
(exports["escape"] = escape);
(exports["singleQuote"] = singleQuote);
(exports["lineContinuation"] = lineContinuation);
(exports["unicodeEscapeSequence"] = unicodeEscapeSequence);
(exports["hexEscapeSequence"] = hexEscapeSequence);
(exports["characterEscapeSequence"] = characterEscapeSequence);
(exports["escapeSequence"] = escapeSequence);
(exports["singleStringCharacter"] = singleStringCharacter);
(exports["singleStringCharacters"] = singleStringCharacters);
(exports["singleStringLiteral"] = singleStringLiteral);
(exports["doubleStringCharacter"] = doubleStringCharacter);
(exports["doubleStringCharacters"] = doubleStringCharacters);
(exports["doubleStringLiteral"] = doubleStringLiteral);
(exports["stringLiteral"] = stringLiteral);