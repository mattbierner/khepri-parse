/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/function_parser.kep'
 * DO NOT EDIT
*/"use strict";
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
    argumentList, namedArgumentList, argumentsPattern, functionExpression, eager = __o["eager"],
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
    operator = __o2["operator"],
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
    expression = late((function() {
        var __o5 = require("./expression_parser"),
            expression0 = __o5["expression"];
        return expression0;
    })),
    argumentElements = eager(listPattern0(expected("pattern", topLevelPattern), ellipsisPattern, expected(
        "non-ellipsis pattern", topLevelPattern))),
    selfPattern = next(punctuator("="), unpack);
(argumentList = label("Argument List", nodea(enumeration(argumentElements, optional(selfPattern)), (function(loc,
    elements, self) {
    return ast_pattern.ArgumentsPattern.create(loc, null, elements, self);
}))));
(namedArgumentList = label("Named Argument List", nodea(next(operator("-"), enumeration(optional(identifierPattern),
        between(punctuator("("), punctuator(")"), argumentElements), optional(selfPattern))), ast_pattern.ArgumentsPattern
    .create)));
(argumentsPattern = label("Arguments Pattern", either(namedArgumentList, argumentList)));
var functionName, functionBody;
(functionExpression = label("Function Expression", ((functionName = optional(next(keyword("function"), optional(
        identifier)))), (functionBody = either(blockStatement, then(expression, optional(punctuator("§"))))),
    nodea(enumeration(functionName, next(punctuator("\\"), argumentsPattern), next(punctuator("->"), expected(
        "function body", functionBody))), ast_expression.FunctionExpression.create))));
(exports["argumentList"] = argumentList);
(exports["namedArgumentList"] = namedArgumentList);
(exports["argumentsPattern"] = argumentsPattern);
(exports["functionExpression"] = functionExpression);