/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/function_parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "khepri-ast/expression", "khepri-ast/statement",
    "khepri-ast/pattern", "./common", "./token_parser", "./value_parser", "./pattern_parser", "./expression_parser"
], (function(require, exports, __o, __o0, ast_expression, ast_statement, ast_pattern, __o1, __o2, __o3, __o4, _) {
    "use strict";
    var attempt = __o["attempt"],
        bind = __o["bind"],
        binds = __o["binds"],
        choice = __o["choice"],
        eager = __o["eager"],
        either = __o["either"],
        enumeration = __o["enumeration"],
        expected = __o["expected"],
        next = __o["next"],
        optional = __o["optional"],
        late = __o["late"],
        label = __o["label"],
        between = __o0["between"],
        sepBy = __o0["sepBy"],
        sepBy1 = __o0["sepBy1"],
        then = __o0["then"],
        node = __o1["node"],
        nodea = __o1["nodea"],
        keyword = __o2["keyword"],
        punctuator = __o2["punctuator"],
        operator = __o2["operator"],
        identifier = __o3["identifier"],
        topLevelPattern = __o4["topLevelPattern"],
        listPattern0 = __o4["listPattern0"],
        ellipsisPattern = __o4["ellipsisPattern"],
        unpack = __o4["unpack"],
        identifierPattern = __o4["identifierPattern"],
        argumentList, namedArgumentList, argumentsPattern, functionExpression, element, blockStatement = late((
            function() {
                var __o5 = require("./statement_parser"),
                    blockStatement0 = __o5["blockStatement"];
                return blockStatement0;
            })),
        expression = late((function() {
            var __o5 = require("./expression_parser"),
                expression0 = __o5["expression"];
            return expression0;
        })),
        argumentElements = ((element = topLevelPattern), eager(listPattern0(expected("pattern", element),
            ellipsisPattern, expected("non-ellipsis pattern", element)))),
        selfPattern = next(punctuator("="), unpack);
    (argumentList = label("Argument List", nodea(enumeration(argumentElements, optional(selfPattern)), (
        function(loc, elements, self) {
            return ast_pattern.ArgumentsPattern.create(loc, null, elements, self);
        }))));
    (namedArgumentList = label("Named Argument List", nodea(next(operator("-"), enumeration(optional(
            identifierPattern), between(punctuator("("), punctuator(")"), argumentElements),
        optional(selfPattern))), ast_pattern.ArgumentsPattern.create)));
    (argumentsPattern = label("Arguments Pattern", either(namedArgumentList, argumentList)));
    var functionName, functionBody;
    (functionExpression = label("Function Expression", ((functionName = optional(next(keyword("function"),
        optional(identifier)))), (functionBody = either(blockStatement, then(expression, optional(
        punctuator("§"))))), nodea(enumeration(functionName, next(punctuator("\\"),
            argumentsPattern), next(punctuator("->"), expected("function body", functionBody))),
        ast_expression.FunctionExpression.create))));
    (exports["argumentList"] = argumentList);
    (exports["namedArgumentList"] = namedArgumentList);
    (exports["argumentsPattern"] = argumentsPattern);
    (exports["functionExpression"] = functionExpression);
}));