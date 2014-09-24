/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/function_parser.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("bennu")["lang"],
    ast_expression = require("khepri-ast")["expression"],
    ast_statement = require("khepri-ast")["statement"],
    ast_pattern = require("khepri-ast")["pattern"],
    __o1 = require("./common"),
    __o2 = require("./token_parser"),
    __o3 = require("./value_parser"),
    __o4 = require("./pattern_parser"),
    _ = require("./expression_parser"),
    argumentList, namedArgumentList, argumentsPattern, functionExpression, choice = __o["choice"],
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
    y, y0, blockStatement = late((function() {
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
    argumentElements = eager(listPattern0(((y = expected.bind(null, "pattern")), y(topLevelPattern)), ellipsisPattern, (
        (y0 = expected.bind(null, "non-ellipsis pattern")), y0(topLevelPattern)))),
    selfPattern = next(punctuator("="), unpack),
    x = label.bind(null, "Argument List"),
    y1 = nodea(enumeration(argumentElements, optional(selfPattern)), (function(loc, elements, self) {
        return ast_pattern.ArgumentsPattern.create(loc, null, elements, self);
    }));
(argumentList = x(y1));
var x0 = label.bind(null, "Named Argument List"),
    elements = between(punctuator("("), punctuator(")"), argumentElements),
    y2 = nodea(next(infixOperator("-"), enumeration(optional(identifierPattern), elements, optional(selfPattern))),
        ast_pattern.ArgumentsPattern.create);
(namedArgumentList = x0(y2));
var x1 = label.bind(null, "Arguments Pattern"),
    y3 = either(namedArgumentList, argumentList);
(argumentsPattern = x1(y3));
var y5, x2 = label.bind(null, "Function Expression"),
    functionName = optional(next(keyword("function"), optional(identifier))),
    functionBody = choice(blockStatement, withStatement, tryStatement, then(expression, optional(punctuator("§")))),
    y4 = nodea(enumeration(functionName, next(punctuator("\\"), argumentsPattern), next(punctuator("->"), ((y5 =
        expected.bind(null, "function body")), y5(functionBody)))), ast_expression.FunctionExpression.create);
(functionExpression = x2(y4));
(exports["argumentList"] = argumentList);
(exports["namedArgumentList"] = namedArgumentList);
(exports["argumentsPattern"] = argumentsPattern);
(exports["functionExpression"] = functionExpression);