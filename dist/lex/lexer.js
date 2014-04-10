/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/lexer.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "nu-stream/stream", "khepri-ast/token",
    "khepri-ast/position", "./boolean_lexer", "./comment_lexer", "./identifier_lexer", "./line_terminator_lexer",
    "./null_lexer", "./number_lexer", "./punctuator_lexer", "./reserved_word_lexer", "./string_lexer",
    "./whitespace_lexer", "./regular_expression_lexer"
], (function(require, exports, parse, __o, __o0, lexToken, __o1, __o2, __o3, __o4, __o5, __o6, __o7, __o8, __o9,
    __o10, __o11, __o12) {
    "use strict";
    var always = parse["always"],
        attempt = parse["attempt"],
        binds = parse["binds"],
        bind = parse["bind"],
        choice = parse["choice"],
        either = parse["either"],
        eof = parse["eof"],
        getPosition = parse["getPosition"],
        enumeration = parse["enumeration"],
        extract = parse["extract"],
        expected = parse["expected"],
        next = parse["next"],
        many = parse["many"],
        runState = parse["runState"],
        label = parse["label"],
        ParserState = parse["ParserState"],
        then = __o["then"],
        memoStream = __o0["memoStream"],
        NIL = __o0["NIL"],
        streamFrom = __o0["from"],
        SourceLocation = __o1["SourceLocation"],
        SourcePosition = __o1["SourcePosition"],
        booleanLiteral = __o2["booleanLiteral"],
        comment = __o3["comment"],
        identifier = __o4["identifier"],
        identifierName = __o4["identifierName"],
        lineTerminator = __o5["lineTerminator"],
        nullLiteral = __o6["nullLiteral"],
        numericLiteral = __o7["numericLiteral"],
        punctuator = __o8["punctuator"],
        reservedWord = __o9["reservedWord"],
        stringLiteral = __o10["stringLiteral"],
        whitespace = __o11["whitespace"],
        regularExpressionLiteral = __o12["regularExpressionLiteral"],
        literal, token, inputElement, lexer, lexManyState, lex, type, p, type0, p0, type1, p1, type2, p2, type3,
            p3, type4, p4, type5, p5, type6, p6, type7, p7, type8, p8, type9, p9, literalImpl = choice(((type =
                lexToken.StringToken), (p = stringLiteral), p.map((function(value) {
                return [type, value];
            }))), ((type0 = lexToken.RegularExpressionToken), (p0 = regularExpressionLiteral), p0.map((
                function(value) {
                    return [type0, value];
                }))), ((type1 = lexToken.BooleanToken), (p1 = booleanLiteral), p1.map((function(value) {
                return [type1, value];
            }))), ((type2 = lexToken.NullToken), (p2 = nullLiteral), p2.map((function(value) {
                return [type2, value];
            }))), ((type3 = lexToken.NumberToken), (p3 = numericLiteral), p3.map((function(value) {
                return [type3, value];
            })))),
        tokenImpl = choice(attempt(((type4 = lexToken.IdentifierToken), (p4 = identifier), p4.map((function(
            value) {
            return [type4, value];
        })))), attempt(literalImpl), ((type5 = lexToken.KeywordToken), (p5 = reservedWord), p5.map((
            function(value) {
                return [type5, value];
            }))), ((type6 = lexToken.PunctuatorToken), (p6 = punctuator), p6.map((function(value) {
            return [type6, value];
        })))),
        inputElementImpl = choice(((type7 = lexToken.CommentToken), (p7 = comment), p7.map((function(value) {
            return [type7, value];
        }))), ((type8 = lexToken.WhitespaceToken), (p8 = whitespace), p8.map((function(value) {
            return [type8, value];
        }))), ((type9 = lexToken.LineTerminatorToken), (p9 = lineTerminator), p9.map((function(value) {
            return [type9, value];
        }))), tokenImpl),
        p10 = literalImpl;
    (literal = binds(enumeration(getPosition, p10, getPosition), (function(start, __o13, end) {
        var type10 = __o13[0],
            value = __o13[1];
        return always(new(type10)(new(SourceLocation)(start, end), value));
    })));
    var p11 = tokenImpl;
    (token = binds(enumeration(getPosition, p11, getPosition), (function(start, __o13, end) {
        var type10 = __o13[0],
            value = __o13[1];
        return always(new(type10)(new(SourceLocation)(start, end), value));
    })));
    var p12 = inputElementImpl;
    (inputElement = binds(enumeration(getPosition, p12, getPosition), (function(start, __o13, end) {
        var type10 = __o13[0],
            value = __o13[1];
        return always(new(type10)(new(SourceLocation)(start, end), value));
    })));
    (lexer = then(many(inputElement), eof));
    (lex = (function(input) {
        return runState(lexer, new(ParserState)(streamFrom(input), SourcePosition.initial));
    }));
    (exports["literal"] = literal);
    (exports["token"] = token);
    (exports["inputElement"] = inputElement);
    (exports["lexer"] = lexer);
    (exports["lexManyState"] = lexManyState);
    (exports["lex"] = lex);
}));