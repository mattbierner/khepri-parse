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
    infixOperator = __o8["infixOperator"],
    prefixOperator = __o8["prefixOperator"],
    reservedWord = __o9["reservedWord"],
    stringLiteral = __o10["stringLiteral"],
    whitespace = __o11["whitespace"],
    regularExpressionLiteral = __o12["regularExpressionLiteral"],
    type, type0, type1, type2, type3, type4, type5, type6, type7, type8, type9, type10, type11, literalImpl = choice(((
        type = lexToken.StringToken.create), stringLiteral.map((function(value) {
        return [type, value];
    }))), ((type0 = lexToken.RegularExpressionToken.create), regularExpressionLiteral.map((function(value) {
        return [type0, value];
    }))), ((type1 = lexToken.BooleanToken.create), booleanLiteral.map((function(value) {
        return [type1, value];
    }))), ((type2 = lexToken.NullToken.create), nullLiteral.map((function(value) {
        return [type2, value];
    }))), ((type3 = lexToken.NumberToken.create), numericLiteral.map((function(value) {
        return [type3, value];
    })))),
    tokenImpl = choice(attempt(((type4 = lexToken.IdentifierToken.create), identifier.map((function(value) {
        return [type4, value];
    })))), attempt(literalImpl), ((type5 = lexToken.KeywordToken.create), reservedWord.map((function(value) {
        return [type5, value];
    }))), ((type6 = (function(loc, __o13) {
        var base = __o13[0],
            user = __o13[1];
        return lexToken.PrefixOperatorToken.create(loc, (base + user), base);
    })), prefixOperator.map((function(value) {
        return [type6, value];
    }))), ((type7 = (function(loc, __o13) {
        var base = __o13[0],
            user = __o13[1];
        return lexToken.InfixOperatorToken.create(loc, (base + user), base);
    })), infixOperator.map((function(value) {
        return [type7, value];
    }))), ((type8 = lexToken.PunctuatorToken.create), punctuator.map((function(value) {
        return [type8, value];
    })))),
    inputElementImpl = choice(((type9 = lexToken.CommentToken.create), comment.map((function(value) {
        return [type9, value];
    }))), ((type10 = lexToken.WhitespaceToken.create), whitespace.map((function(value) {
        return [type10, value];
    }))), ((type11 = lexToken.LineTerminatorToken.create), lineTerminator.map((function(value) {
        return [type11, value];
    }))), tokenImpl),
    p = literalImpl;
(literal = binds(enumeration(getPosition, p, getPosition), (function(start, __o13, end) {
    var type12 = __o13[0],
        value = __o13[1];
    return always(type12(new(SourceLocation)(start, end, (start.file || end.file)), value));
})));
var p0 = tokenImpl;
(token = binds(enumeration(getPosition, p0, getPosition), (function(start, __o13, end) {
    var type12 = __o13[0],
        value = __o13[1];
    return always(type12(new(SourceLocation)(start, end, (start.file || end.file)), value));
})));
var p1 = inputElementImpl;
(inputElement = binds(enumeration(getPosition, p1, getPosition), (function(start, __o13, end) {
    var type12 = __o13[0],
        value = __o13[1];
    return always(type12(new(SourceLocation)(start, end, (start.file || end.file)), value));
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