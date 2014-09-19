/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/common.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "XRegExp", "bennu/parse", "nu-stream/stream"], (function(require, exports, XRP, __o, __o0) {
    "use strict";
    var join, match, map = __o["map"],
        token = __o["token"],
        foldl = __o0["foldl"],
        __add = (function(x, y) {
            return (x + y);
        }),
        XRegExp = (XRP.XRegExp || XRP);
    (join = map.bind(null, foldl.bind(null, __add, "")));
    (match = (function(pattern, flags) {
        return token(XRegExp()
            .test.bind(XRegExp(pattern, ((flags || "") + "x"))));
    }));
    (exports["join"] = join);
    (exports["match"] = match);
}));