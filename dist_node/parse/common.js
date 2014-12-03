/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/common.kep'
 * DO NOT EDIT
*/
"use strict";
var parse = require("bennu")["parse"],
    stream = require("nu-stream")["stream"],
    __o = require("khepri-ast")["position"],
    sepEndWith1, sepEndWith, sepEndWith0, precedence, node, nodea, positionParser, always = parse["always"],
    binds = parse["binds"],
    cons = parse["cons"],
    either = parse["either"],
    enumeration = parse["enumeration"],
    extract = parse["extract"],
    eager = parse["eager"],
    optional = parse["optional"],
    next = parse["next"],
    rec = parse["rec"],
    NIL = stream["NIL"],
    SourceLocation = __o["SourceLocation"];
(sepEndWith1 = (function(sep, end, p) {
    return rec((function(self) {
        return cons(p, optional(NIL, next(sep, either(enumeration(end), self))));
    }));
}));
(sepEndWith = (function(sep, end, p) {
    return either(enumeration(end), rec((function(self) {
        return cons(p, optional(NIL, next(sep, either(enumeration(end), self))));
    })));
}));
var y = optional.bind(null, NIL);
(sepEndWith0 = (function() {
    var args = arguments;
    return y(sepEndWith.apply(null, args));
}));
var pres = (function(list) {
    var stack = [],
        out = [];
    while ((list.length > 0)) {
        var tok = list.shift();
        if (tok.type) {
            out.push(tok);
        } else {
            while ((stack.length > 0)) {
                var o2 = stack[(stack.length - 1)];
                if ((((!tok.right) && (o2.precedence === tok.precedence)) || (o2.precedence < tok.precedence))) {
                    stack.pop();
                    var rt = out.pop(),
                        lf = out.pop();
                    out.push(o2.node(SourceLocation.merge(lf.loc, rt.loc), o2.value, lf, rt));
                } else {
                    break;
                }
            }
            stack.push(tok);
        }
    }
    while ((stack.length > 0)) {
        var o = stack.pop(),
            rt0 = out.pop(),
            lf0 = out.pop();
        out.push(o.node(SourceLocation.merge(lf0.loc, rt0.loc), o.value, lf0, rt0));
    }
    return out.pop();
});
(precedence = (function(p, table) {
    var sep = parse.choicea(table.map((function(entry) {
        return entry.sep.map((function(value) {
            return ({
                value: value,
                node: entry.node,
                precedence: entry.precedence,
                right: entry.right
            });
        }));
    })));
    return eager(parse.rec((function(self) {
        return parse.cons(p, optional(NIL, parse.cons(sep, parse.expected("binary expression", self))));
    })))
        .map(pres);
}));
(positionParser = extract((function(x) {
    return x.position.sourcePosition;
})));
var prevEnd = extract((function(x) {
    return x.position.prevEnd;
}));
(node = (function(p, f) {
    return binds(enumeration(positionParser, p, prevEnd), (function(o, x, c) {
        return always(f(new(SourceLocation)(o, c), x));
    }));
}));
(nodea = (function(p, f) {
    return binds(enumeration(positionParser, p, prevEnd), (function(o, x, c) {
        var loc, y0;
        return always(((loc = new(SourceLocation)(o, c)), (y0 = stream.toArray(stream.cons(loc, x))), f
            .apply(null, y0)));
    }));
}));
(exports["sepEndWith1"] = sepEndWith1);
(exports["sepEndWith"] = sepEndWith);
(exports["sepEndWith0"] = sepEndWith0);
(exports["precedence"] = precedence);
(exports["node"] = node);
(exports["nodea"] = nodea);
(exports["positionParser"] = positionParser);