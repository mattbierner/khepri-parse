/*
 * THIS FILE IS AUTO GENERATED from 'lib/lex/lexer.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/lang", "nu-stream/stream", "khepri-ast/token",
    "khepri-ast/position", "./boolean_lexer", "./comment_lexer", "./identifier_lexer", "./line_terminator_lexer",
    "./null_lexer", "./number_lexer", "./punctuator_lexer", "./reserved_word_lexer", "./string_lexer",
    "./whitespace_lexer", "./regular_expression_lexer"
], (function(require, exports, parse, __o, __o0, lexToken, __o1, __o2, __o3, __o4, __o5, __o6, __o7, __o8, __o9,
    __o10, __o11, __o12) {
    "use strict";
    var literal, token, inputElement, lexer, lex, lexStream, always = parse["always"],
        attempt = parse["attempt"],
        binds = parse["binds"],
        choice = parse["choice"],
        eof = parse["eof"],
        getPosition = parse["getPosition"],
        enumeration = parse["enumeration"],
        many = parse["many"],
        runState = parse["runState"],
        ParserState = parse["ParserState"],
        then = __o["then"],
        streamFrom = __o0["from"],
        SourceLocation = __o1["SourceLocation"],
        SourcePosition = __o1["SourcePosition"],
        booleanLiteral = __o2["booleanLiteral"],
        comment = __o3["comment"],
        identifier = __o4["identifier"],
        lineTerminator = __o5["lineTerminator"],
        nullLiteral = __o6["nullLiteral"],
        numericLiteral = __o7["numericLiteral"],
        punctuator = __o8["punctuator"],
        infixOperator = __o8["infixOperator"],
        prefixOperator = __o8["prefixOperator"],
        reservedWord = __o9["reservedWord"],
        stringLiteral = __o10["stringLiteral"],
        whitespace = __o11["whitespace"],
        regularExpressionLiteral = __o12["regularExpressionLiteral"],
        type, type0, type1, type2, type3, type4, type5, type6, type7, type8, type9, type10, type11, literalImpl =
            choice(((type = lexToken.StringToken), stringLiteral.map((function(value) {
                return [type, value];
            }))), ((type0 = lexToken.RegularExpressionToken), regularExpressionLiteral.map((function(value) {
                return [type0, value];
            }))), ((type1 = lexToken.BooleanToken), booleanLiteral.map((function(value) {
                return [type1, value];
            }))), ((type2 = lexToken.NullToken), nullLiteral.map((function(value) {
                return [type2, value];
            }))), ((type3 = lexToken.NumberToken), numericLiteral.map((function(value) {
                return [type3, value];
            })))),
        tokenImpl = choice(attempt(((type4 = lexToken.IdentifierToken), identifier.map((function(value) {
            return [type4, value];
        })))), attempt(literalImpl), ((type5 = lexToken.KeywordToken), reservedWord.map((function(value) {
            return [type5, value];
        }))), ((type6 = lexToken.PrefixOperatorToken), prefixOperator.map((function(value) {
            return [type6, value];
        }))), attempt(((type7 = lexToken.InfixOperatorToken), infixOperator.map((function(value) {
            return [type7, value];
        })))), ((type8 = lexToken.PunctuatorToken), punctuator.map((function(value) {
            return [type8, value];
        })))),
        inputElementImpl = choice(((type9 = lexToken.CommentToken), comment.map((function(value) {
            return [type9, value];
        }))), ((type10 = lexToken.WhitespaceToken), whitespace.map((function(value) {
            return [type10, value];
        }))), ((type11 = lexToken.LineTerminatorToken), lineTerminator.map((function(value) {
            return [type11, value];
        }))), tokenImpl),
        p = literalImpl;
    (literal = binds(enumeration(getPosition, p, getPosition), (function(start, __o13, end) {
        var type12 = __o13[0],
            value = __o13[1];
        return always(new(type12)(new(SourceLocation)(start, end, (start.file || end.file)), value));
    })));
    var p0 = tokenImpl;
    (token = binds(enumeration(getPosition, p0, getPosition), (function(start, __o13, end) {
        var type12 = __o13[0],
            value = __o13[1];
        return always(new(type12)(new(SourceLocation)(start, end, (start.file || end.file)), value));
    })));
    var p1 = inputElementImpl;
    (inputElement = binds(enumeration(getPosition, p1, getPosition), (function(start, __o13, end) {
        var type12 = __o13[0],
            value = __o13[1];
        return always(new(type12)(new(SourceLocation)(start, end, (start.file || end.file)), value));
    })));
    (lexer = then(many(inputElement), eof));
    var initialFilePosition = (function(file) {
        return new(SourcePosition)(SourcePosition.initial.line, SourcePosition.initial.column, file);
    });
    (lexStream = (function(input, file) {
        return runState(lexer, new(ParserState)(input, initialFilePosition(file)));
    }));
    (lex = (function(input, file) {
        var input0 = streamFrom(input);
        return runState(lexer, new(ParserState)(input0, initialFilePosition(file)));
    }));
    (exports["literal"] = literal);
    (exports["token"] = token);
    (exports["inputElement"] = inputElement);
    (exports["lexer"] = lexer);
    (exports["lex"] = lex);
    (exports["lexStream"] = lexStream);
}));