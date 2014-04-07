/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/pattern_parser.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/lang", "nu-stream/stream", "khepri-ast/pattern", "./common",
    "./token_parser", "./value_parser"
], (function(require, exports, __o, __o0, __o1, ast_pattern, __o2, __o3, __o4) {
    "use strict";
    var attempt = __o["attempt"],
        append = __o["append"],
        bind = __o["bind"],
        binds = __o["binds"],
        choice = __o["choice"],
        cons = __o["cons"],
        eager = __o["eager"],
        either = __o["either"],
        expected = __o["expected"],
        enumeration = __o["enumeration"],
        next = __o["next"],
        optional = __o["optional"],
        rec = __o["rec"],
        label = __o["label"],
        late = __o["late"],
        between = __o0["between"],
        sepBy = __o0["sepBy"],
        sepBy1 = __o0["sepBy1"],
        sepEndBy = __o0["sepEndBy"],
        then = __o0["then"],
        NIL = __o1["NIL"],
        node = __o2["node"],
        nodea = __o2["nodea"],
        keyword = __o3["keyword"],
        punctuator = __o3["punctuator"],
        identifier = __o4["identifier"],
        stringLiteral = __o4["stringLiteral"],
        pattern, topLevelPattern, identifierPattern, sinkPattern, ellipsisPattern, importPattern, arrayPattern,
            objectPattern, argumentList, argumentsPattern, asPattern, element0, sep1, end0, p0, pre0, post0;
    (topLevelPattern = late((function() {
        return topLevelPattern;
    })));
    (asPattern = late((function() {
        return asPattern;
    })));
    (objectPattern = late((function() {
        return objectPattern;
    })));
    var sep = optional(null, punctuator(","));
    (identifierPattern = label("Identifier Pattern", identifier.map((function(x) {
        return ast_pattern.IdentifierPattern.create(x.loc, x);
    }))));
    (sinkPattern = label("Sink Pattern", keyword("_")
        .map((function(x) {
            return ast_pattern.SinkPattern.create(x.loc);
        }))));
    (ellipsisPattern = label("Ellipsis Pattern", node(next(punctuator("..."), identifierPattern), ast_pattern.EllipsisPattern
        .create)));
    var element, sep0, end, p, pre, post;
    (arrayPattern = label("Array Pattern", ((element = topLevelPattern), (sep0 = sep), (end = ellipsisPattern), (
        p = expected("array pattern element", element)), (pre = either(enumeration(end), rec((
        function(self) {
            return cons(p, optional(NIL, next(sep0, either(enumeration(end), self))));
        })))), (post = sepBy(sep, expected("non-ellipsis array pattern element", element))), node(
        between(punctuator("["), punctuator("]"), eager(append(pre, next(sep, post)))), ast_pattern
        .ArrayPattern.create))));
    var objectPatternElement = either(nodea(enumeration(stringLiteral, next(punctuator(":"), choice(
            arrayPattern, objectPattern, asPattern, identifierPattern))), ast_pattern.ObjectPatternElement.create),
        node(either(asPattern, identifierPattern), (function(loc, key) {
            return ast_pattern.ObjectPatternElement.create(loc, key, null);
        })));
    (objectPattern = label("Object Pattern", node(between(punctuator("{"), punctuator("}"), eager(sepBy1(sep,
        expected("object pattern element", objectPatternElement)))), ast_pattern.ObjectPattern.create)));
    (asPattern = label("As Pattern", nodea(enumeration(attempt(then(identifierPattern, punctuator("#"))),
            expected("object or array pattern", choice(arrayPattern, objectPattern))), ast_pattern.AsPattern
        .create)));
    (importPattern = label("Import Pattern", next(keyword("import"), nodea(enumeration(stringLiteral,
        topLevelPattern), ast_pattern.ImportPattern.create))));
    (topLevelPattern = label("Top Level Pattern", choice(sinkPattern, arrayPattern, objectPattern, asPattern,
        identifierPattern)));
    var argumentElements = ((element0 = topLevelPattern), (sep1 = sep), (end0 = ellipsisPattern), (p0 =
        expected("pattern", element0)), (pre0 = optional(NIL, either(enumeration(end0), rec((function(self) {
        return cons(p0, optional(NIL, next(sep1, either(enumeration(end0), self))));
    }))))), (post0 = sepBy(sep, expected("non-ellipsis pattern", element0))), eager(append(pre0, post0))),
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
}));