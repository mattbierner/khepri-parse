/*
 * THIS FILE IS AUTO GENERATED from 'lib/lex/string_lexer.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/text", "bennu/lang", "nu-stream/stream", "./line_terminator_lexer",
    "./number_lexer"
], (function(require, exports, __o, __o0, __o1, __o2, __o3, __o4) {
    "use strict";
    var always = __o["always"],
        attempt = __o["attempt"],
        bind = __o["bind"],
        choice = __o["choice"],
        either = __o["either"],
        eof = __o["eof"],
        many = __o["many"],
        next = __o["next"],
        sequence = __o["sequence"],
        Parser = __o["Parser"],
        test = __o["test"],
        token = __o["token"],
        character = __o0["character"],
        between = __o1["between"],
        times = __o1["times"],
        foldl = __o2["foldl"],
        lineTerminatorSequence = __o3["lineTerminatorSequence"],
        lineTerminator = __o3["lineTerminator"],
        decimalDigit = __o4["decimalDigit"],
        hexDigit = __o4["hexDigit"],
        doubleQuote, escape, singleQuote, lineContinuation, unicodeEscapeSequence, hexEscapeSequence,
            characterEscapeSequence, escapeSequence, singleStringCharacter, singleStringCharacters,
            singleStringLiteral, doubleStringCharacter, doubleStringCharacters, doubleStringLiteral,
            stringLiteral, join = foldl.bind(null, (function(x, y) {
                return (x + y);
            }), ""),
        fromCharCode = (function(p) {
            return bind(p, (function(x) {
                return always(String.fromCharCode(parseInt(join(x), 16)));
            }));
        });
    (doubleQuote = character("\""));
    (singleQuote = character("'"));
    (escape = character("\\"));
    (lineContinuation = sequence(escape, lineTerminatorSequence, always("")));
    var singleEscapeCharacter = choice(doubleQuote, singleQuote, escape, next(character("b"), always("\b")),
        next(character("f"), always("\f")), next(character("n"), always("\n")), next(character("r"), always(
            "\r")), next(character("t"), always("\t")), next(character("v"), always("\u000b"))),
        escapeCharacter = choice(singleEscapeCharacter, decimalDigit, character("u"), character("x")),
        nonEscapeCharacter = token((function(tok) {
            return (!(test(escapeCharacter, tok) || test(lineTerminator, tok)));
        }));
    (hexEscapeSequence = next(character("x"), fromCharCode(times(2, hexDigit))));
    (unicodeEscapeSequence = next(character("u"), fromCharCode(times(4, hexDigit))));
    (characterEscapeSequence = either(singleEscapeCharacter, nonEscapeCharacter));
    (escapeSequence = choice(characterEscapeSequence, sequence(character("0"), either(eof, token((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(x) {
        return (!x);
    }), test.bind(null, decimalDigit)))), always("\u0000")), hexEscapeSequence, unicodeEscapeSequence));
    (singleStringCharacter = Parser("Single String Character", choice(attempt(lineContinuation), next(escape,
        escapeSequence), token((function(tok) {
        return (!((test(singleQuote, tok) || test(escape, tok)) || test(lineTerminator, tok)));
    })))));
    (singleStringCharacters = many(singleStringCharacter));
    (singleStringLiteral = Parser("Single String Literal", between(singleQuote, singleQuote, bind(
        singleStringCharacters, (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(always, join)))));
    (doubleStringCharacter = choice(attempt(lineContinuation), next(escape, escapeSequence), token((function(
        tok) {
        return (!((test(doubleQuote, tok) || test(escape, tok)) || test(lineTerminator, tok)));
    }))));
    (doubleStringCharacters = many(doubleStringCharacter));
    (doubleStringLiteral = Parser("Double String Literal", between(doubleQuote, doubleQuote, bind(
        doubleStringCharacters, (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(always, join)))));
    (stringLiteral = Parser("Sting Literal Lexer", either(singleStringLiteral, doubleStringLiteral)));
    (exports.doubleQuote = doubleQuote);
    (exports.escape = escape);
    (exports.singleQuote = singleQuote);
    (exports.lineContinuation = lineContinuation);
    (exports.unicodeEscapeSequence = unicodeEscapeSequence);
    (exports.hexEscapeSequence = hexEscapeSequence);
    (exports.characterEscapeSequence = characterEscapeSequence);
    (exports.escapeSequence = escapeSequence);
    (exports.singleStringCharacter = singleStringCharacter);
    (exports.singleStringCharacters = singleStringCharacters);
    (exports.singleStringLiteral = singleStringLiteral);
    (exports.doubleStringCharacter = doubleStringCharacter);
    (exports.doubleStringCharacters = doubleStringCharacters);
    (exports.doubleStringLiteral = doubleStringLiteral);
    (exports.stringLiteral = stringLiteral);
}));