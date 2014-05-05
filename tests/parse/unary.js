var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var expr = parser.parseStream(stream);
    return expr.body[0].expression;
};


exports.unary_expression = function(test) {
    var expr = testParser(lexer.lex("!a;"));
    test.equal(expr.type, 'UnaryExpression');
    test.equal(expr.operator, '!');
    test.equal(expr.argument.name, 'a');
    
    test.done();
};

exports.unary_associativity = function(test) {
    var expr = testParser(lexer.lex("~ ! a;"));
    test.equal(expr.type, 'UnaryExpression');
    test.equal(expr.operator, '~');
    test.equal(expr.argument.type, 'UnaryExpression');
    test.equal(expr.argument.operator, '!');
    test.equal(expr.argument.argument.name, 'a');
    
    test.done();
};


exports.unary_grouping = function(test) {
    var expr = testParser(lexer.lex("~!a;"));
    test.equal(expr.type, 'UnaryExpression');
    test.equal(expr.operator, '~!');
    test.equal(expr.argument.name, 'a');
    
    test.done();
};

exports.custom_unary = function(test) {
    var expr = testParser(lexer.lex("~|a;"));
    test.equal(expr.type, 'UnaryExpression');
    test.equal(expr.operator, '~|');
    test.equal(expr.argument.name, 'a');
    
    test.done();
};

exports.custom_unary_does_not_capture_parans = function(test) {
    var expr = testParser(lexer.lex("~|(a);"));
    test.equal(expr.type, 'UnaryExpression');
    test.equal(expr.operator, '~|');
    test.equal(expr.argument.name, 'a');
    
    test.done();
};
