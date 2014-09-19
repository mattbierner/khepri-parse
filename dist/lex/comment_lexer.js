/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/comment_lexer.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/text", "bennu/lang", "./common", "./line_terminator_lexer"], (
    function(require, exports, __o, __o0, __o1, __o2, __o3) {
        "use strict";
        var singleLineCommentMarker, singleLineCommentChar, singleLineCommentChars, singleLineComment,
                multiLineCommentStartMarker, multiLineCommentEndMarker, multiLineCommentChars, multiLineComment,
                comment, anyToken = __o["anyToken"],
            either = __o["either"],
            many = __o["many"],
            next = __o["next"],
            not = __o["not"],
            label = __o["label"],
            string = __o0["string"],
            between = __o1["between"],
            join = __o2["join"],
            lineTerminator = __o3["lineTerminator"];
        (singleLineCommentMarker = string("//"));
        (singleLineCommentChar = next(not(lineTerminator), anyToken));
        (singleLineCommentChars = many(singleLineCommentChar));
        (singleLineComment = label("Single Line Comment Lexer", next(singleLineCommentMarker, join(
            singleLineCommentChars))));
        (multiLineCommentStartMarker = string("/*"));
        (multiLineCommentEndMarker = string("*/"));
        (multiLineCommentChars = label("Multi Line Comment Characters Lexer", many(next(not(
            multiLineCommentEndMarker), anyToken))));
        (multiLineComment = label("Multi Line Comment Lexer", between(multiLineCommentStartMarker,
            multiLineCommentEndMarker, join(multiLineCommentChars))));
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