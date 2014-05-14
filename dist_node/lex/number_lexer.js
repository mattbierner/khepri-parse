/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/number_lexer.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("bennu")["text"],
    __o1 = require("nu-stream")["stream"],
    decimal, negativeSign, positiveSign, exponentIndicator, hexIndicator, decimalDigit, nonZeroDigit, hexDigit,
        decimalDigits, hexDigits, unsignedInteger, signedInteger, exponentPart, hexIntegerLiteral,
        decimalIntegerLiteral, decimalLiteral, numericLiteral, always = __o["always"],
    attempt = __o["attempt"],
    binds = __o["binds"],
    either = __o["either"],
    enumeration = __o["enumeration"],
    expected = __o["expected"],
    many1 = __o["many1"],
    map = __o["map"],
    next = __o["next"],
    optional = __o["optional"],
    label = __o["label"],
    character = __o0["character"],
    oneOf = __o0["oneOf"],
    string = __o0["string"],
    foldl = __o1["foldl"],
    __minus = (function(x) {
        return (-x);
    }),
    __add = (function(x, y) {
        return (x + y);
    }),
    join = map.bind(null, foldl.bind(null, __add, ""));
(decimal = character("."));
(negativeSign = character("-"));
(positiveSign = character("+"));
(exponentIndicator = oneOf("eE"));
(hexIndicator = either(string("0x"), string("0X")));
(decimalDigit = oneOf("0123456789"));
(nonZeroDigit = oneOf("123456789"));
(hexDigit = oneOf("0123456789abcdefABCDEF"));
(decimalDigits = label("Decimal Digits Lexer", join(many1(decimalDigit))));
(hexDigits = label("Hex Digits Lexer", join(many1(hexDigit))));
(unsignedInteger = label("Unsigned Integer Lexer", map(parseInt, decimalDigits)));
(signedInteger = label("Signed Integer Lexer", either(next(negativeSign, map(__minus, unsignedInteger)), next(optional(
    positiveSign), unsignedInteger))));
var hexIntegerLiteralDigits = label("Hex Integer Literal Digits Lexer", map((function(num) {
    return parseInt(num, 16);
}), hexDigits));
(exponentPart = label("Exponent Part Lexer", next(exponentIndicator, signedInteger)));
(hexIntegerLiteral = label("Hex Integer Literal Lexer", next(hexIndicator, hexIntegerLiteralDigits)));
(decimalIntegerLiteral = label("Decimal Integer Literal", map(parseInt, decimalDigits)));
(decimalLiteral = label("Decimal Literal Lexer", binds(enumeration(binds(enumeration(decimalDigits, optional(0, attempt(
    next(decimal, decimalDigits)))), (function(whole, fractional) {
    return always(parseFloat(((whole + ".") + fractional)));
})), optional(0, exponentPart)), (function(num, exp) {
    return always((num * Math.pow(10, parseInt(exp))));
}))));
(numericLiteral = label("Numeric Literal Lexer", either(next(attempt(hexIndicator), expected("hex digits",
    hexIntegerLiteralDigits)), decimalLiteral)));
(exports["decimal"] = decimal);
(exports["negativeSign"] = negativeSign);
(exports["positiveSign"] = positiveSign);
(exports["exponentIndicator"] = exponentIndicator);
(exports["hexIndicator"] = hexIndicator);
(exports["decimalDigit"] = decimalDigit);
(exports["nonZeroDigit"] = nonZeroDigit);
(exports["hexDigit"] = hexDigit);
(exports["decimalDigits"] = decimalDigits);
(exports["hexDigits"] = hexDigits);
(exports["unsignedInteger"] = unsignedInteger);
(exports["signedInteger"] = signedInteger);
(exports["exponentPart"] = exponentPart);
(exports["hexIntegerLiteral"] = hexIntegerLiteral);
(exports["decimalIntegerLiteral"] = decimalIntegerLiteral);
(exports["decimalLiteral"] = decimalLiteral);
(exports["numericLiteral"] = numericLiteral);