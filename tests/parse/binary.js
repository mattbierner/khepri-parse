var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;
var $ = require('../$');

var testParser = function(program) {
    var expr = parser.parseStream(lexer.lex(program));
    return expr.body[0].expression;
};


exports.binary_expression = function(test) {
    var expr = testParser("a + b;");
    
    test.equal(expr.type, 'BinaryExpression');
    $.binaryOp(test, '+', expr.operator);
    $.id(test, expr.left, 'a');
    $.id(test, expr.right, 'b');
    
    test.done();
};

exports.checked_binary_expression = function(test) {
    var expr = testParser("a ?? b;");
    
    test.equal(expr.type, 'BinaryExpression');
    $.binaryOp(test, '??', expr.operator);
    $.id(test, expr.left, 'a');
    $.id(test, expr.right, 'b');
    
    test.done();
};

exports.binary_associativity = function(test) {
    var expr = testParser("a + b + c;");
    
    test.equal(expr.type, 'BinaryExpression');
    $.binaryOp(test, '+', expr.operator);
    
    test.equal(expr.left.type, 'BinaryExpression');
    $.id(test, expr.left.left, 'a');
    $.id(test, expr.left.right, 'b');
    $.binaryOp(test, '+', expr.left.operator);
    $.id(test, expr.right, 'c');
    
    test.done();
};

exports.binary_parens = function(test) {
    var expr = testParser("a + (b + c);");
    
    test.equal(expr.type, 'BinaryExpression');
    $.binaryOp(test, '+', expr.operator);
    $.id(test, expr.left, 'a');
    
    test.equal(expr.right.type, 'BinaryExpression');
    $.binaryOp(test, '+', expr.right.operator);
    $.id(test, expr.right.left, 'b');
    $.id(test, expr.right.right, 'c');
    
    test.done();
};

exports.binary_spread = function(test) {
    var expr = testParser("a+(b, c);");
    
    test.equal(expr.type, 'BinaryExpression');
    $.binaryOp(test, '+', expr.operator);
    $.id(test, expr.left, 'a');
    
    test.equal(expr.right.length, '2');
    $.id(test, expr.right[0], 'b');
    $.id(test, expr.right[1], 'c');
    
    test.done();
};

exports.binary_with_op = function(test) {
    var expr = testParser("a + (+);");
    
    test.equal(expr.type, 'BinaryExpression');
    $.binaryOp(test, '+', expr.operator);
    $.id(test, expr.left, 'a');
    
    test.equal(expr.right.type, 'OperatorExpression');
    $.binaryOp(test, '*', expr.right.operator);
    
    test.done();
};

exports.binary_precedence = function(test) {
    var expr = testParser("a + b * c;");
    
    test.equal(expr.type, 'BinaryExpression');
    $.binaryOp(test, '+', expr.operator);
    $.id(test, expr.left, 'a');
    
    test.equal(expr.right.type, 'BinaryExpression');
    $.binaryOp(test, '*', expr.right.operator);
    $.id(test, expr.right.left, 'b');
    $.id(test, expr.right.right, 'c');
    
    test.done();
};

exports.binary_precedence_parens = function(test) {
    var expr = testParser("(a + b) * c;");
    
    test.equal(expr.type, 'BinaryExpression');
    $.binaryOp(test, '*', expr.operator);
    $.id(test, expr.right, 'c');
    
    test.equal(expr.left.type, 'BinaryExpression');
    $.binaryOp(test, '+', expr.left.operator);
    $.id(test, expr.left.left, 'a');
    $.id(test, expr.left.right, 'b');
    
    test.done();
};

exports.custom_binary_expression = function(test) {
    var expr = testParser("a +|+ b;");
    test.equal(expr.type, 'BinaryExpression');
    $.binaryOp(test, '+|+', expr.operator);

    $.id(test, expr.left, 'a');
    $.id(test, expr.right, 'b');
    
    test.done();
};

exports.custom_binary_precedence = function(test) {
    var expr = testParser("a +? b *? c;");
    
    test.equal(expr.type, 'BinaryExpression');
    $.binaryOp(test, '+?', expr.operator);

    $.id(test, expr.left, 'a');
    test.equal(expr.right.type, 'BinaryExpression');
    $.binaryOp(test, '*?', expr.right.operator);
    $.id(test, expr.right.left, 'b');
    $.id(test, expr.right.right, 'c');
    
    test.done();
};
