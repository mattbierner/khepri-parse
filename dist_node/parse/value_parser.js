/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/value_parser.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    always = __o["always"],
    bind = __o["bind"],
    choice = __o["choice"],
    label = __o["label"],
    ast_value = require("khepri-ast")["value"],
    token = require("./token_parser"),
    literal, nullLiteral, booleanLiteral, numericLiteral, stringLiteral, regularExpressionLiteral, identifier,
        literalParser = (function(kind, p) {
            return bind(p, (function(x) {
                return always(ast_value.Literal.create(x.loc, kind, x.value));
            }));
        });
(nullLiteral = label("Null Literal", literalParser("null", token.nullLiteral)));
(booleanLiteral = label("Boolean Literal", literalParser("boolean", token.booleanLiteral)));
(numericLiteral = label("Numeric Literal", literalParser("number", token.numericLiteral)));
(stringLiteral = label("String Literal", literalParser("string", token.stringLiteral)));
(regularExpressionLiteral = label("Regular Expression Literal", literalParser("regexp", token.regularExpressionLiteral)));
(literal = label("Literal", choice(nullLiteral, booleanLiteral, numericLiteral, stringLiteral, regularExpressionLiteral)));
(identifier = label("Identifier", bind(token.anyIdentifier, (function(x) {
    return always(ast_value.Identifier.create(x.loc, x.value));
}))));
(exports["literal"] = literal);
(exports["nullLiteral"] = nullLiteral);
(exports["booleanLiteral"] = booleanLiteral);
(exports["numericLiteral"] = numericLiteral);
(exports["stringLiteral"] = stringLiteral);
(exports["regularExpressionLiteral"] = regularExpressionLiteral);
(exports["identifier"] = identifier);