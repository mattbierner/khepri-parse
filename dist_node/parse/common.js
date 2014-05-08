/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/common.kep'
 * DO NOT EDIT
*/
"use strict";
var parse = require("bennu")["parse"],
    always = parse["always"],
    bind = parse["bind"],
    binds = parse["binds"],
    extract = parse["extract"],
    enumeration = parse["enumeration"],
    eager = parse["eager"],
    optional = parse["optional"],
    stream = require("nu-stream")["stream"],
    NIL = stream["NIL"],
    __o = require("khepri-ast")["position"],
    SourceLocation = __o["SourceLocation"],
    precedence, node, nodea, positionParser, pres = (function(list) {
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
(positionParser = extract((function(__o0) {
    var position = __o0["position"];
    return position.sourcePosition;
})));
var prevEnd = extract((function(__o0) {
    var position = __o0["position"];
    return position.prevEnd;
}));
(node = (function(p, f) {
    return binds(enumeration(positionParser, p, prevEnd), (function(o, x, c) {
        return always(f(new(SourceLocation)(o, c), x));
    }));
}));
(nodea = (function(p, f) {
    return binds(enumeration(positionParser, p, prevEnd), (function(o, x, c) {
        return always(f.apply(undefined, stream.toArray(stream.cons(new(SourceLocation)(o, c), x))));
    }));
}));
(exports["precedence"] = precedence);
(exports["node"] = node);
(exports["nodea"] = nodea);
(exports["positionParser"] = positionParser);