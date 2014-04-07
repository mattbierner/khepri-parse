/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/comment_lexer.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/text", "nu-stream/stream", "./line_terminator_lexer"], (function(
    require, exports, __o, __o0, __o1, __o2) {
    "use strict";
    var anyToken = __o["anyToken"],
        always = __o["always"],
        bind = __o["bind"],
        cons = __o["cons"],
        either = __o["either"],
        many = __o["many"],
        map = __o["map"],
        next = __o["next"],
        label = __o["label"],
        rec = __o["rec"],
        test = __o["test"],
        token = __o["token"],
        character = __o0["character"],
        string = __o0["string"],
        foldl = __o1["foldl"],
        NIL = __o1["NIL"],
        lineTerminator = __o2["lineTerminator"],
        singleLineCommentMarker, singleLineCommentChar, singleLineCommentChars, singleLineComment,
            multiLineCommentStartMarker, multiLineCommentEndMarker, multiLineCommentChars, multiLineComment,
            comment, __add = (function(x, y) {
                return (x + y);
            }),
        join = map.bind(null, foldl.bind(null, __add, ""));
    (singleLineCommentMarker = string("//"));
    var y;
    (singleLineCommentChar = token(((y = test.bind(null, lineTerminator)), (function(x) {
        var x0 = y(x);
        return (!x0);
    }))));
    (singleLineCommentChars = many(singleLineCommentChar));
    (singleLineComment = label("Single Line Comment Lexer", next(singleLineCommentMarker, join(
        singleLineCommentChars))));
    (multiLineCommentStartMarker = string("/*"));
    (multiLineCommentEndMarker = string("*/"));
    (multiLineCommentChars = label("Multi Line Comment Characters Lexer", rec((function(self) {
        return either(next(character("*"), either(next(character("/"), always(NIL)), cons(
            always("*"), self))), cons(anyToken, self));
    }))));
    (multiLineComment = label("Multi Line Comment Lexer", next(multiLineCommentStartMarker, join(
        multiLineCommentChars))));
    (comment = label("Comment Lexer", either(singleLineComment, multiLineComment)));
    (exports["singleLineCommentMarker"] = singleLineCommentMarker);
    (exports["singleLineCommentChar"] = singleLineCommentChar);
    (exports["singleLineCommentChars"] = singleLineCommentChars);
    (exports["singleLineComment"] = singleLineComment);
    (exports["multiLineCommentStartMarker"] = multiLineCommentStartMarker);
    (exports["multiLineCommentEndMarker"] = multiLineCommentEndMarker);
    (exports["multiLineCommentChars"] = multiLineCommentChars);
    (exports["multiLineComment"] = multiLineComment);
    (exports["comment"] = comment);
}));