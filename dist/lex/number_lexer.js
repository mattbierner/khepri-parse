/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/number_lexer.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "bennu/text", "nu-stream/stream"], (function(require,
    exports, __o, __o0, __o1, __o2) {
    "use strict";
    var always = __o["always"],
        attempt = __o["attempt"],
        bind = __o["bind"],
        binds = __o["binds"],
        choice = __o["choice"],
        either = __o["either"],
        enumeration = __o["enumeration"],
        expected = __o["expected"],
        many = __o["many"],
        many1 = __o["many1"],
        next = __o["next"],
        optional = __o["optional"],
        label = __o["label"],
        then = __o0["then"],
        character = __o1["character"],
        oneOf = __o1["oneOf"],
        match = __o1["match"],
        string = __o1["string"],
        foldl = __o2["foldl"],
        decimal, negativeSign, positiveSign, exponentIndicator, hexIndicator, decimalDigit, nonZeroDigit,
            hexDigit, decimalDigits, hexDigits, unsignedInteger, signedInteger, exponentPart, hexIntegerLiteral,
            decimalIntegerLiteral, decimalLiteral, numericLiteral, join = (function(p) {
                return bind(p, (function(f, g) {
                    return (function(x) {
                        return f(g(x));
                    });
                })(always, foldl.bind(null, (function(x, y) {
                    return (x + y);
                }), "")));
            });
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
    (unsignedInteger = label("Unsigned Integer Lexer", bind(decimalDigits, (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(always, parseInt))));
    (signedInteger = label("Signed Integer Lexer", either(next(negativeSign, bind(unsignedInteger, (function(f,
        g) {
        return (function(x) {
            return f(g(x));
        });
    })(always, (function(x) {
        return (-x);
    })))), next(optional(null, positiveSign), unsignedInteger))));
    var hexIntegerLiteralDigits = label("Hex Integer Literal Digits Lexer", bind(hexDigits, (function(num) {
        return always(parseInt(num, 16));
    })));
    (exponentPart = label("Exponent Part Lexer", next(exponentIndicator, signedInteger)));
    (hexIntegerLiteral = label("Hex Integer Literal Lexer", next(hexIndicator, hexIntegerLiteralDigits)));
    (decimalIntegerLiteral = label("Decimal Integer Literal", bind(decimalDigits, (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(always, parseInt))));
    (decimalLiteral = label("Decimal Literal Lexer", binds(enumeration(binds(enumeration(decimalDigits,
        optional(0, attempt(next(decimal, decimalDigits)))), (function(whole, fractional) {
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
}));