/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/pattern_parser.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/lang", "khepri-ast/pattern", "./common", "./token_parser",
    "./value_parser"
], (function(require, exports, __o, __o0, ast_pattern, __o1, __o2, __o3) {
    "use strict";
    var always = __o["always"],
        attempt = __o["attempt"],
        bind = __o["bind"],
        binds = __o["binds"],
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
        keyword = __o2["keyword"],
        punctuator = __o2["punctuator"],
        identifier = __o3["identifier"],
        stringLiteral = __o3["stringLiteral"],
        pattern, topLevelPattern, identifierPattern, sinkPattern, ellipsisPattern, importPattern, arrayPattern,
            objectPattern, argumentList, argumentsPattern, asPattern, subPattern;
    (topLevelPattern = late((function() {
        return topLevelPattern;
    })));
    (asPattern = late((function() {
        return asPattern;
    })));
    (objectPattern = late((function() {
        return objectPattern;
    })));
    (subPattern = late((function() {
        return subPattern;
    })));
    var sep = optional(null, punctuator(","));
    (identifierPattern = label("Identifier Pattern", bind(identifier, (function(x) {
        return always(ast_pattern.IdentifierPattern.create(x.loc, x));
    }))));
    (sinkPattern = label("Sink Pattern", bind(keyword("_"), (function(x) {
        return always(ast_pattern.SinkPattern.create(x.loc));
    }))));
    (ellipsisPattern = label("Ellipsis Pattern", bind(punctuator("..."), (function(x) {
        return always(ast_pattern.EllipsisPattern.create(x.loc));
    }))));
    (arrayPattern = label("Array Pattern", node(between(punctuator("["), punctuator("]"), expected(
        "array pattern element", eager(sepBy1(sep, topLevelPattern)))), ast_pattern.ArrayPattern.create)));
    var objectPatternElement = either(nodea(enumeration(stringLiteral, next(punctuator(":"), choice(
            arrayPattern, objectPattern, asPattern, identifierPattern))), ast_pattern.ObjectPatternElement.create),
        node(either(asPattern, identifierPattern), (function(loc, key) {
            return ast_pattern.ObjectPatternElement.create(loc, key, null);
        })));
    (objectPattern = label("Object Pattern", node(between(punctuator("{"), punctuator("}"), expected(
            "object pattern element", eager(sepBy1(sep, objectPatternElement)))), ast_pattern.ObjectPattern
        .create)));
    (asPattern = label("As Pattern", nodea(enumeration(attempt(then(identifierPattern, punctuator("#"))),
            expected("object or array pattern", choice(arrayPattern, objectPattern))), ast_pattern.AsPattern
        .create)));
    (importPattern = label("Import Pattern", next(keyword("import"), nodea(enumeration(stringLiteral, choice(
        sinkPattern, objectPattern, asPattern, identifierPattern)), ast_pattern.ImportPattern.create))));
    (topLevelPattern = label("Top Level Pattern", choice(ellipsisPattern, sinkPattern, arrayPattern,
        objectPattern, asPattern, identifierPattern)));
    var subPatternElements = eager(sepBy1(sep, either(topLevelPattern, subPattern)));
    (subPattern = label("Sub Pattern", attempt(nodea(enumeration(identifierPattern, between(punctuator("("),
        punctuator(")"), subPatternElements)), ast_pattern.ArgumentsPattern.create))));
    var argumentElements = eager(sepBy(sep, topLevelPattern)),
        selfPattern = next(punctuator("="), choice(arrayPattern, objectPattern, asPattern, identifierPattern));
    (argumentList = label("Argument List", nodea(enumeration(argumentElements, optional(null, selfPattern)), (
        function(loc, elements, self) {
            return ast_pattern.ArgumentsPattern.create(loc, null, elements, self);
        }))));
    (argumentsPattern = label("Arguments Pattern", either(nodea(enumeration(attempt(then(optional(null,
            identifierPattern), punctuator("("))), then(argumentElements, punctuator(")")),
        optional(null, selfPattern)), ast_pattern.ArgumentsPattern.create), argumentList)));
    (pattern = label("Pattern", choice(importPattern, topLevelPattern)));
    (exports["pattern"] = pattern);
    (exports["topLevelPattern"] = topLevelPattern);
    (exports["identifierPattern"] = identifierPattern);
    (exports["sinkPattern"] = sinkPattern);
    (exports["ellipsisPattern"] = ellipsisPattern);
    (exports["importPattern"] = importPattern);
    (exports["arrayPattern"] = arrayPattern);
    (exports["objectPattern"] = objectPattern);
    (exports["argumentList"] = argumentList);
    (exports["argumentsPattern"] = argumentsPattern);
    (exports["asPattern"] = asPattern);
    (exports["subPattern"] = subPattern);
}));