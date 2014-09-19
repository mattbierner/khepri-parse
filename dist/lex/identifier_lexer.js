/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/identifier_lexer.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/text", "./common", "./reserved_word_lexer"], (function(require,
    exports, __o, __o0, __o1, __o2) {
    "use strict";
    var zwnj, zwj, unicodeLetter, unicodeDigit, unicodeConnectorPunctuation, identifierStart, identifierPart,
            identifierParts, identifierName, identifier, always = __o["always"],
        bind = __o["bind"],
        cons = __o["cons"],
        choice = __o["choice"],
        either = __o["either"],
        fail = __o["fail"],
        many = __o["many"],
        label = __o["label"],
        character = __o0["character"],
        oneOf = __o0["oneOf"],
        join = __o1["join"],
        match = __o1["match"],
        reservedWordList = __o2["reservedWordList"];
    (zwnj = character("‌"));
    (zwj = character("‍"));
    (unicodeLetter = match(
        "   \\p{Lu}            (?#Uppercase letter)    |   \\p{Ll}            (?#Lowercase letter)    |   \\p{Lt}            (?#Titlecase letter)    |   \\p{Lm}            (?#Modifier letter)    |   \\p{Lo}            (?#Other letter)    |   \\p{Nl}            (?#Letter number)    "
    ));
    (unicodeDigit = match("\\p{Nd}(?#Number digit)"));
    (unicodeConnectorPunctuation = match("\\p{Pc}(?#Connector Punctuation)"));
    (identifierStart = either(unicodeLetter, oneOf("$_")));
    (identifierPart = choice(identifierStart, unicodeDigit, unicodeConnectorPunctuation, zwnj, zwj));
    (identifierParts = many(identifierPart));
    (identifierName = cons(identifierStart, identifierParts));
    (identifier = label("Identifier Lexer", bind(join(identifierName), (function(name) {
        return ((reservedWordList.indexOf(name) >= 0) ? fail() : always(name));
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