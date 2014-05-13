/*
 * THIS FILE IS AUTO GENERATED from 'lib/lex/string_lexer.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("bennu")["text"],
    __o1 = require("bennu")["lang"],
    __o2 = require("nu-stream")["stream"],
    __o3 = require("./line_terminator_lexer"),
    __o4 = require("./number_lexer"),
    doubleQuote, escape, singleQuote, lineContinuation, unicodeEscapeSequence, hexEscapeSequence,
        characterEscapeSequence, escapeSequence, singleStringCharacter, singleStringCharacters, singleStringLiteral,
        doubleStringCharacter, doubleStringCharacters, doubleStringLiteral, stringLiteral, always = __o["always"],
    attempt = __o["attempt"],
    choice = __o["choice"],
    either = __o["either"],
    eof = __o["eof"],
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
    foldl = __o2["foldl"],
    lineTerminatorSequence = __o3["lineTerminatorSequence"],
    lineTerminator = __o3["lineTerminator"],
    decimalDigit = __o4["decimalDigit"],
    hexDigit = __o4["hexDigit"],
    x, __add = (function(x, y) {
        return (x + y);
    }),
    join = foldl.bind(null, __add, ""),
    fromCharCode = map.bind(null, (function(x) {
        return String.fromCharCode(parseInt(join(x), 16));
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
(hexEscapeSequence = next(character("x"), fromCharCode(times(2, hexDigit))));
(unicodeEscapeSequence = next(character("u"), fromCharCode(times(4, hexDigit))));
(characterEscapeSequence = either(singleEscapeCharacter, nonEscapeCharacter));
(escapeSequence = choice(characterEscapeSequence, sequence(character("0"), either(eof, next(not(decimalDigit), anyToken)),
    always("\u0000")), hexEscapeSequence, unicodeEscapeSequence));
(singleStringCharacter = label("Single String Character", choice(attempt(lineContinuation), next(escape, escapeSequence),
    next(not(lineTerminator), noneOf("'\\")))));
(singleStringCharacters = many(singleStringCharacter));
(singleStringLiteral = label("Single String Literal", between(singleQuote, singleQuote, map(join,
    singleStringCharacters))));
(doubleStringCharacter = choice(attempt(lineContinuation), next(escape, escapeSequence), next(not(lineTerminator),
    noneOf("\"\\"))));
(doubleStringCharacters = many(doubleStringCharacter));
(doubleStringLiteral = label("Double String Literal", between(doubleQuote, doubleQuote, map(join,
    doubleStringCharacters))));
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