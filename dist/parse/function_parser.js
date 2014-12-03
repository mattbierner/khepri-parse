/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/function_parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "khepri-ast/expression", "khepri-ast/statement",
    "khepri-ast/pattern", "./common", "./token_parser", "./value_parser", "./pattern_parser", "./expression_parser"
], (function(require, exports, __o, __o0, ast_expression, ast_statement, ast_pattern, __o1, __o2, __o3, __o4, _) {
    "use strict";
    var argumentList, namedArgumentList, argumentsPattern, functionExpression, choice = __o["choice"],
        eager = __o["eager"],
        either = __o["either"],
        enumeration = __o["enumeration"],
        expected = __o["expected"],
        next = __o["next"],
        optional = __o["optional"],
        late = __o["late"],
        label = __o["label"],
        between = __o0["between"],
        then = __o0["then"],
        nodea = __o1["nodea"],
        keyword = __o2["keyword"],
        punctuator = __o2["punctuator"],
        infixOperator = __o2["infixOperator"],
        identifier = __o3["identifier"],
        topLevelPattern = __o4["topLevelPattern"],
        listPattern0 = __o4["listPattern0"],
        ellipsisPattern = __o4["ellipsisPattern"],
        unpack = __o4["unpack"],
        identifierPattern = __o4["identifierPattern"],
        blockStatement = late((function() {
            var __o5 = require("./statement_parser"),
                blockStatement0 = __o5["blockStatement"];
            return blockStatement0;
        })),
        withStatement = late((function() {
            var __o5 = require("./statement_parser"),
                withStatement0 = __o5["withStatement"];
            return withStatement0;
        })),
        tryStatement = late((function() {
            var __o5 = require("./statement_parser"),
                tryStatement0 = __o5["tryStatement"];
            return tryStatement0;
        })),
        expression = late((function() {
            var __o5 = require("./expression_parser"),
                expression0 = __o5["expression"];
            return expression0;
        })),
        argumentElements = eager(listPattern0(expected("pattern", topLevelPattern), ellipsisPattern, expected(
            "non-ellipsis pattern", topLevelPattern))),
        selfPattern = next(punctuator("="), unpack);
    (argumentList = label("Argument List", nodea(enumeration(argumentElements, optional(selfPattern)), (
        function(loc, elements, self) {
            return ast_pattern.ArgumentsPattern.create(loc, null, elements, self);
        }))));
    var elements;
    (namedArgumentList = label("Named Argument List", ((elements = between(punctuator("("), punctuator(")"),
        argumentElements)), nodea(next(infixOperator("-"), enumeration(optional(identifierPattern),
        elements, optional(selfPattern))), ast_pattern.ArgumentsPattern.create))));
    (argumentsPattern = label("Arguments Pattern", either(namedArgumentList, argumentList)));
    var functionName, functionBody;
    (functionExpression = label("Function Expression", ((functionName = optional(next(keyword("function"),
        optional(identifier)))), (functionBody = choice(blockStatement, withStatement, tryStatement,
        then(expression, optional(punctuator("§"))))), nodea(enumeration(functionName, next(
        punctuator("\\"), argumentsPattern), next(punctuator("->"), expected(
        "function body", functionBody))), ast_expression.FunctionExpression.create))));
    (exports["argumentList"] = argumentList);
    (exports["namedArgumentList"] = namedArgumentList);
    (exports["argumentsPattern"] = argumentsPattern);
    (exports["functionExpression"] = functionExpression);
}));