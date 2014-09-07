/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/pattern_parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "nu-stream/stream", "khepri-ast/pattern", "./common",
    "./token_parser", "./value_parser"
], (function(require, exports, __o, __o0, __o1, ast_pattern, __o2, __o3, __o4) {
    "use strict";
    var listPattern, listPattern0, pattern, unpack, topLevelPattern, identifierPattern, operatorPattern,
            sinkPattern, ellipsisPattern, importPattern, arrayPattern, objectPatternElement, objectPattern,
            asPattern, attempt = __o["attempt"],
        append = __o["append"],
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
        then = __o0["then"],
        NIL = __o1["NIL"],
        node = __o2["node"],
        nodea = __o2["nodea"],
        keyword = __o3["keyword"],
        punctuator = __o3["punctuator"],
        identifier = __o4["identifier"],
        operator = __o4["operator"],
        stringLiteral = __o4["stringLiteral"],
        sepEndWith1 = (function(sep, end, p) {
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
    (operatorPattern = label("Operator Pattern", operator.map((function(x) {
        return ast_pattern.IdentifierPattern.create(x.loc, x);
    }))));
    (sinkPattern = label("Sink Pattern", keyword("_")
        .map((function(x) {
            return ast_pattern.SinkPattern.create(x.loc);
        }))));
    (ellipsisPattern = label("Ellipsis Pattern", either(attempt(between(punctuator("("), punctuator(")"),
            punctuator("..."))
        .map((function(x) {
            return ast_pattern.EllipsisPattern.create(x.loc, null);
        }))), node(next(punctuator("..."), optional(identifierPattern)), ast_pattern.EllipsisPattern
        .create))));
    var element, pre, mid, post, sep0;
    (arrayPattern = label("Array Pattern", ((element = topLevelPattern), nodea(enumeration(optional(false,
        punctuator("?")), between(punctuator("["), punctuator("]"), eager(((pre = expected(
        "array pattern element", element)), (mid = ellipsisPattern), (post =
        expected("non-ellipsis array pattern element", element)), append(((sep0 =
        sep), either(enumeration(mid), rec((function(self) {
        return cons(pre, optional(NIL, next(sep0, either(
            enumeration(mid), self))));
    })))), next(sep, sepBy(sep, post))))))), (function(loc, checked, elements) {
        return ast_pattern.ArrayPattern.create(loc, elements, checked);
    })))));
    (objectPatternElement = either(nodea(enumeration(stringLiteral, next(punctuator(":", "#"), unpack)),
        ast_pattern.ObjectPatternElement.create), node(either(asPattern, identifierPattern),
        ast_pattern.ObjectPatternElement.create)));
    (objectPattern = label("Object Pattern", nodea(enumeration(optional(false, punctuator("?")), between(
        punctuator("{"), punctuator("}"), eager(sepBy1(sep, expected("object pattern element",
            objectPatternElement))))), (function(loc, checked, elements) {
        return ast_pattern.ObjectPattern.create(loc, elements, checked);
    }))));
    (asPattern = label("As Pattern", nodea(enumeration(attempt(then(identifierPattern, punctuator("#"))),
            expected("object or array pattern", choice(arrayPattern, objectPattern))), ast_pattern.AsPattern
        .create)));
    (importPattern = label("Import Pattern", next(keyword("import"), nodea(enumeration(stringLiteral,
        topLevelPattern), ast_pattern.ImportPattern.create))));
    (unpack = label("Unpack", choice(arrayPattern, objectPattern, asPattern, identifierPattern, operatorPattern)));
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
}));