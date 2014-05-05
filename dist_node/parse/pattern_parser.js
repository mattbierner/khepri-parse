/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/pattern_parser.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    attempt = __o["attempt"],
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
    __o0 = require("bennu")["lang"],
    between = __o0["between"],
    sepBy = __o0["sepBy"],
    sepBy1 = __o0["sepBy1"],
    sepEndBy = __o0["sepEndBy"],
    then = __o0["then"],
    __o1 = require("nu-stream")["stream"],
    NIL = __o1["NIL"],
    ast_pattern = require("khepri-ast")["pattern"],
    __o2 = require("./common"),
    node = __o2["node"],
    nodea = __o2["nodea"],
    __o3 = require("./token_parser"),
    keyword = __o3["keyword"],
    punctuator = __o3["punctuator"],
    __o4 = require("./value_parser"),
    identifier = __o4["identifier"],
    stringLiteral = __o4["stringLiteral"],
    listPattern, listPattern0, pattern, unpack, topLevelPattern, identifierPattern, sinkPattern, ellipsisPattern,
        importPattern, arrayPattern, objectPatternElement, objectPattern, asPattern, sepEndWith1 = (function(sep, end,
            p) {
            return rec((function(self) {
                return cons(p, optional(NIL, next(sep, either(enumeration(end), self))));
            }));
        }),
    sepEndWith = (function(sep, end, p) {
        return either(enumeration(end), sepEndWith1(sep, end, p));
    }),
    sepEndWith0 = (function(sep, end, p) {
        return optional(NIL, sepEndWith(sep, end, p));
    });
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
(sinkPattern = label("Sink Pattern", keyword("_")
    .map((function(x) {
        return ast_pattern.SinkPattern.create(x.loc);
    }))));
(ellipsisPattern = label("Ellipsis Pattern", either(between(punctuator("("), punctuator(")"), punctuator("..."))
    .map((function(x) {
        return ast_pattern.EllipsisPattern.create(x.loc, null);
    })), node(next(punctuator("..."), optional(identifierPattern)), ast_pattern.EllipsisPattern.create))));
var element, pre, mid, post, sep0;
(arrayPattern = label("Array Pattern", ((element = topLevelPattern), node(between(punctuator("["), punctuator("]"),
    eager(((pre = expected("array pattern element", element)), (mid = ellipsisPattern), (post =
        expected("non-ellipsis array pattern element", element)), append(((sep0 = sep), either(
        enumeration(mid), rec((function(self) {
            return cons(pre, optional(NIL, next(sep0, either(enumeration(mid),
                self))));
        })))), next(sep, sepBy(sep, post)))))), ast_pattern.ArrayPattern.create))));
(objectPatternElement = either(nodea(enumeration(stringLiteral, next(punctuator(":"), unpack)), ast_pattern.ObjectPatternElement
    .create), node(either(asPattern, identifierPattern), (function(loc, key) {
    return ast_pattern.ObjectPatternElement.create(loc, key, null);
}))));
(objectPattern = label("Object Pattern", node(between(punctuator("{"), punctuator("}"), eager(sepBy1(sep, expected(
    "object pattern element", objectPatternElement)))), ast_pattern.ObjectPattern.create)));
(asPattern = label("As Pattern", nodea(enumeration(attempt(then(identifierPattern, punctuator("#"))), expected(
    "object or array pattern", choice(arrayPattern, objectPattern))), ast_pattern.AsPattern.create)));
(importPattern = label("Import Pattern", next(keyword("import"), nodea(enumeration(stringLiteral, topLevelPattern),
    ast_pattern.ImportPattern.create))));
(unpack = label("Unpack", choice(arrayPattern, objectPattern, asPattern, identifierPattern)));
(topLevelPattern = label("Top Level Pattern", choice(sinkPattern, unpack)));
(exports["listPattern"] = listPattern);
(exports["listPattern0"] = listPattern0);
(exports["pattern"] = pattern);
(exports["unpack"] = unpack);
(exports["topLevelPattern"] = topLevelPattern);
(exports["identifierPattern"] = identifierPattern);
(exports["sinkPattern"] = sinkPattern);
(exports["ellipsisPattern"] = ellipsisPattern);
(exports["importPattern"] = importPattern);
(exports["arrayPattern"] = arrayPattern);
(exports["objectPatternElement"] = objectPatternElement);
(exports["objectPattern"] = objectPattern);
(exports["asPattern"] = asPattern);