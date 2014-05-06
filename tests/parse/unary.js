var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var expr = parser.parseStream(stream);
    return expr.body[0].expression;
};

var checkUnaryOp = function(test, op, value) {
    test.equal(value.type, 'UnaryOperator');
    test.equal(value.name, op);
};


exports.unary_expression = function(test) {
    var expr = testParser(lexer.lex("!a;"));
    
    test.equal(expr.type, 'UnaryExpression');
    checkUnaryOp(test, '!', expr.operator);
    test.equal(expr.argument.name, 'a');
    
    test.done();
};

exports.unary_associativity = function(test) {
    var expr = testParser(lexer.lex("~ ! a;"));
    
    test.equal(expr.type, 'UnaryExpression');
    checkUnaryOp(test, '~', expr.operator);
    
    test.equal(expr.argument.type, 'UnaryExpression');
    checkUnaryOp(test, '!', expr.argument.operator);
    test.equal(expr.argument.argument.name, 'a');
    
    test.done();
};


exports.unary_grouping = function(test) {
    var expr = testParser(lexer.lex("~!a;"));
    
    test.equal(expr.type, 'UnaryExpression');
    checkUnaryOp(test, '~!', expr.operator);
    test.equal(expr.argument.name, 'a');
    
    test.done();
};

exports.custom_unary = function(test) {
    var expr = testParser(lexer.lex("~|a;"));
    
    test.equal(expr.type, 'UnaryExpression');
    checkUnaryOp(test, '~|', expr.operator);
    test.equal(expr.argument.name, 'a');
    
    test.done();
};

exports.custom_unary_does_not_capture_parans = function(test) {
    var expr = testParser(lexer.lex("~|(a);"));
    
    test.equal(expr.type, 'UnaryExpression');
    checkUnaryOp(test, '~|', expr.operator);
    test.equal(expr.argument.name, 'a');
    
    test.done();
};
