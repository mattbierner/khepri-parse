/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/value_parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "khepri-ast/value", "./token_parser"], (function(require, exports, __o,
    ast_value, token) {
    "use strict";
    var bind = __o["bind"],
        choice = __o["choice"],
        label = __o["label"],
        literal, nullLiteral, booleanLiteral, numericLiteral, stringLiteral, regularExpressionLiteral,
            identifier, p;
    (nullLiteral = label("Null Literal", ((p = token.nullLiteral), p.map((function(x) {
        return ast_value.Literal.create(x.loc, "null", x.value);
    })))));
    var p0;
    (booleanLiteral = label("Boolean Literal", ((p0 = token.booleanLiteral), p0.map((function(x) {
        return ast_value.Literal.create(x.loc, "boolean", x.value);
    })))));
    var p1;
    (numericLiteral = label("Numeric Literal", ((p1 = token.numericLiteral), p1.map((function(x) {
        return ast_value.Literal.create(x.loc, "number", x.value);
    })))));
    var p2;
    (stringLiteral = label("String Literal", ((p2 = token.stringLiteral), p2.map((function(x) {
        return ast_value.Literal.create(x.loc, "string", x.value);
    })))));
    var p3;
    (regularExpressionLiteral = label("Regular Expression Literal", ((p3 = token.regularExpressionLiteral), p3.map(
        (function(x) {
            return ast_value.Literal.create(x.loc, "regexp", x.value);
        })))));
    (literal = label("Literal", choice(nullLiteral, booleanLiteral, numericLiteral, stringLiteral,
        regularExpressionLiteral)));
    (identifier = label("Identifier", token.anyIdentifier.map((function(x) {
        return ast_value.Identifier.create(x.loc, x.value);
    }))));
    (exports["literal"] = literal);
    (exports["nullLiteral"] = nullLiteral);
    (exports["booleanLiteral"] = booleanLiteral);
    (exports["numericLiteral"] = numericLiteral);
    (exports["stringLiteral"] = stringLiteral);
    (exports["regularExpressionLiteral"] = regularExpressionLiteral);
    (exports["identifier"] = identifier);
}));