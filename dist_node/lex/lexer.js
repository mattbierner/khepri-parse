/*
 * THIS FILE IS AUTO GENERATED from 'lib/lex/lexer.kep'
 * DO NOT EDIT
*/"use strict";
var parse = require("bennu")["parse"],
    __o = require("bennu")["lang"],
    __o0 = require("nu-stream")["stream"],
    lexToken = require("khepri-ast")["token"],
    __o1 = require("khepri-ast")["position"],
    __o2 = require("./boolean_lexer"),
    __o3 = require("./comment_lexer"),
    __o4 = require("./identifier_lexer"),
    __o5 = require("./line_terminator_lexer"),
    __o6 = require("./null_lexer"),
    __o7 = require("./number_lexer"),
    __o8 = require("./punctuator_lexer"),
    __o9 = require("./reserved_word_lexer"),
    __o10 = require("./string_lexer"),
    __o11 = require("./whitespace_lexer"),
    __o12 = require("./regular_expression_lexer"),
    literal, token, inputElement, lexer, lex, lexStream, always = parse["always"],
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
    operator = __o8["operator"],
    reservedWord = __o9["reservedWord"],
    stringLiteral = __o10["stringLiteral"],
    whitespace = __o11["whitespace"],
    regularExpressionLiteral = __o12["regularExpressionLiteral"],
    type, type0, type1, type2, type3, type4, type5, type6, type7, type8, type9, type10, literalImpl = choice(((type =
        lexToken.StringToken), stringLiteral.map((function(value) {
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
    }))), attempt(((type6 = lexToken.OperatorToken), operator.map((function(value) {
        return [type6, value];
    })))), ((type7 = lexToken.PunctuatorToken), punctuator.map((function(value) {
        return [type7, value];
    })))),
    inputElementImpl = choice(((type8 = lexToken.CommentToken), comment.map((function(value) {
        return [type8, value];
    }))), ((type9 = lexToken.WhitespaceToken), whitespace.map((function(value) {
        return [type9, value];
    }))), ((type10 = lexToken.LineTerminatorToken), lineTerminator.map((function(value) {
        return [type10, value];
    }))), tokenImpl),
    p = literalImpl;
(literal = binds(enumeration(getPosition, p, getPosition), (function(start, __o13, end) {
    var type11 = __o13[0],
        value = __o13[1];
    return always(new(type11)(new(SourceLocation)(start, end, (start.file || end.file)), value));
})));
var p0 = tokenImpl;
(token = binds(enumeration(getPosition, p0, getPosition), (function(start, __o13, end) {
    var type11 = __o13[0],
        value = __o13[1];
    return always(new(type11)(new(SourceLocation)(start, end, (start.file || end.file)), value));
})));
var p1 = inputElementImpl;
(inputElement = binds(enumeration(getPosition, p1, getPosition), (function(start, __o13, end) {
    var type11 = __o13[0],
        value = __o13[1];
    return always(new(type11)(new(SourceLocation)(start, end, (start.file || end.file)), value));
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