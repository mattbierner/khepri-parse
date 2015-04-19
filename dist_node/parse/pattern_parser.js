/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/pattern_parser.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("bennu")["lang"],
    ast_pattern = require("khepri-ast")["pattern"],
    __o1 = require("./common"),
    __o2 = require("./token_parser"),
    __o3 = require("./value_parser"),
    listPattern, listPattern0, pattern, unpack, topLevelPattern, identifierPattern, operatorPattern, sinkPattern,
        ellipsisPattern, importPattern, arrayPattern, objectPatternElement, objectPattern, asPattern, attempt = __o[
            "attempt"],
    append = __o["append"],
    choice = __o["choice"],
    eager = __o["eager"],
    either = __o["either"],
    expected = __o["expected"],
    enumeration = __o["enumeration"],
    next = __o["next"],
    optional = __o["optional"],
    label = __o["label"],
    late = __o["late"],
    between = __o0["between"],
    sepBy = __o0["sepBy"],
    sepBy1 = __o0["sepBy1"],
    then = __o0["then"],
    node = __o1["node"],
    nodea = __o1["nodea"],
    sepEndWith = __o1["sepEndWith"],
    sepEndWith0 = __o1["sepEndWith0"],
    keyword = __o2["keyword"],
    punctuator = __o2["punctuator"],
    identifier = __o3["identifier"],
    operator = __o3["operator"],
    stringLiteral = __o3["stringLiteral"];
(topLevelPattern = late((function() {
    return topLevelPattern;
})));
(unpack = late((function() {
    return unpack;
})));
(asPattern = late((function() {
    return asPattern;
})));
var sep = optional(punctuator(","));
(listPattern = (function(pre, mid, post) {
    return append(sepEndWith(sep, mid, pre), next(sep, sepBy(sep, post)));
}));
(listPattern0 = (function(pre, mid, post) {
    return append(sepEndWith0(sep, mid, pre), next(sep, sepBy(sep, post)));
}));
(identifierPattern = label("Identifier Pattern", identifier.map((function(x) {
    return ast_pattern.IdentifierPattern.create(x.loc, x);
}))));
(operatorPattern = label("Operator Pattern", operator.map((function(x) {
    return ast_pattern.IdentifierPattern.create(x.loc, x);
}))));
(sinkPattern = label("Sink Pattern", keyword("_")
    .map((function(x) {
        return ast_pattern.SinkPattern.create(x.loc);
    }))));
(ellipsisPattern = label("Ellipsis Pattern", either(attempt(between(punctuator("("), punctuator(")"), punctuator("..."))
    .map((function(x) {
        return ast_pattern.EllipsisPattern.create(x.loc, null);
    }))), node(next(punctuator("..."), optional(identifierPattern)), ast_pattern.EllipsisPattern.create))));
var element;
(arrayPattern = label("Array Pattern", ((element = topLevelPattern), nodea(enumeration(optional(false, punctuator("?")),
    between(punctuator("["), punctuator("]"), eager(listPattern(expected("array pattern element",
        element), ellipsisPattern, expected("non-ellipsis array pattern element", element))))), (
    function(loc, checked, elements) {
        return ast_pattern.ArrayPattern.create(loc, elements, checked);
    })))));
(objectPatternElement = either(nodea(enumeration(stringLiteral, next(punctuator(":", "#"), unpack)), ast_pattern.ObjectPatternElement
    .create), node(choice(asPattern, operatorPattern, identifierPattern), ast_pattern.ObjectPatternElement.create)));
(objectPattern = label("Object Pattern", nodea(enumeration(optional(false, punctuator("?")), between(punctuator("{"),
    punctuator("}"), eager(sepBy1(sep, expected("object pattern element", objectPatternElement))))), (
    function(loc, checked, elements) {
        return ast_pattern.ObjectPattern.create(loc, elements, checked);
    }))));
(asPattern = label("As Pattern", nodea(enumeration(attempt(then(identifierPattern, punctuator("#"))), expected(
    "object or array pattern", choice(attempt(arrayPattern), objectPattern))), ast_pattern.AsPattern.create)));
(importPattern = label("Import Pattern", next(keyword("import"), nodea(enumeration(stringLiteral, topLevelPattern),
    ast_pattern.ImportPattern.create))));
(unpack = label("Unpack", choice(attempt(arrayPattern), objectPattern, asPattern, identifierPattern, operatorPattern)));
(topLevelPattern = label("Top Level Pattern", choice(sinkPattern, unpack)));
(exports["listPattern"] = listPattern);
(exports["listPattern0"] = listPattern0);
(exports["pattern"] = pattern);
(exports["unpack"] = unpack);
(exports["topLevelPattern"] = topLevelPattern);
(exports["identifierPattern"] = identifierPattern);
(exports["operatorPattern"] = operatorPattern);
(exports["sinkPattern"] = sinkPattern);
(exports["ellipsisPattern"] = ellipsisPattern);
(exports["importPattern"] = importPattern);
(exports["arrayPattern"] = arrayPattern);
(exports["objectPatternElement"] = objectPatternElement);
(exports["objectPattern"] = objectPattern);
(exports["asPattern"] = asPattern);