var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var expr = parser.parseStream(stream);
    return expr.body[0].expression;
};


exports.binary_expression = function(test) {
    var expr = testParser(lexer.lex("a + b;"));
    test.equal(expr.type, 'BinaryExpression');
    test.equal(expr.operator, '+');
    test.equal(expr.left.name, 'a');
    test.equal(expr.right.name, 'b');
    
    test.done();
};

exports.binary_associativity = function(test) {
    var expr = testParser(lexer.lex("a + b + c;"));
    test.equal(expr.type, 'BinaryExpression');
    test.equal(expr.operator, '+');
    test.equal(expr.left.type, 'BinaryExpression');
    test.equal(expr.left.left.name, 'a');
    test.equal(expr.left.right.name, 'b');
    test.equal(expr.right.name, 'c');
    
    test.done();
};

exports.binary_parens = function(test) {
    var expr = testParser(lexer.lex("a + (b + c);"));
    test.equal(expr.type, 'BinaryExpression');
    test.equal(expr.operator, '+');
    test.equal(expr.left.name, 'a');
    test.equal(expr.right.type, 'BinaryExpression');
    test.equal(expr.right.operator, '+');
    test.equal(expr.right.left.name, 'b');
    test.equal(expr.right.right.name, 'c');
    
    test.done();
};

exports.binary_precedence = function(test) {
    var expr = testParser(lexer.lex("a + b * c;"));
    test.equal(expr.type, 'BinaryExpression');
    test.equal(expr.operator, '+');
    test.equal(expr.left.name, 'a');
    test.equal(expr.right.type, 'BinaryExpression');
    test.equal(expr.right.operator, '*');
    test.equal(expr.right.left.name, 'b');
    test.equal(expr.right.right.name, 'c');
    
    test.done();
};


exports.custom_binary_expression = function(test) {
    var expr = testParser(lexer.lex("a +|+ b;"));
    test.equal(expr.type, 'BinaryExpression');
    test.equal(expr.operator, '+|+');
    test.equal(expr.left.name, 'a');
    test.equal(expr.right.name, 'b');
    
    test.done();
};

exports.custom_binary_precedence = function(test) {
    var expr = testParser(lexer.lex("a +? b *? c;"));
    test.equal(expr.type, 'BinaryExpression');
    test.equal(expr.operator, '+?');
    test.equal(expr.left.name, 'a');
    test.equal(expr.right.type, 'BinaryExpression');
    test.equal(expr.right.operator, '*?');
    test.equal(expr.right.left.name, 'b');
    test.equal(expr.right.right.name, 'c');
    
    test.done();
};