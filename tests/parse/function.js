var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;
var $ = require('../$');

var testParser = function(stream) {
    var result = parser.parseStream(stream);
    return result.body[0].expression;
};

exports.simple_lambda = function(test) {
    var result = testParser(lexer.lex("\\ -> 3;"));
    
    test.equal(result.type, 'FunctionExpression');
    test.equal(result.params.elements.length, 0);
    test.equal(result.name, null);
    $.number(test, result.body, 3)
    
    test.done();
};

exports.unary_lambda = function(test) {
    var result = testParser(lexer.lex("\\x -> x;"));
    
    test.equal(result.type, 'FunctionExpression');
    test.equal(result.params.elements.length, 1);
    $.idPattern(test, result.params.elements[0], 'x')
    test.equal(result.name, null);
    
    $.id(test, result.body, 'x')

    test.done();
};

exports.empty_function = function(test) {
    var result = testParser(lexer.lex("function \\ -> {};"));
    
    test.equal(result.type, 'FunctionExpression');
    test.equal(result.params.elements.length, 0);
    test.equal(result.name, null);
    test.equal(result.body.type, 'BlockStatement');
    
    test.done();
};

exports.args_unpack_no_elements = function(test) {
    var result = testParser(lexer.lex("\\-x()-> x;"));
    
    test.equal(result.type, 'FunctionExpression');
    $.idPattern(test, result.params.id, 'x');
    test.equal(result.params.elements.length, 0);
    test.equal(result.name, null);
    $.id(test, result.body, 'x')

    test.done();
};

exports.args_unpack_with_elements = function(test) {
    var result = testParser(lexer.lex("\\-x(a b)-> x;"));
    
    test.equal(result.type, 'FunctionExpression');
    $.idPattern(test, result.params.id, 'x');
    
    test.equal(result.params.elements.length, 2);
    test.equal(result.params.elements[0].id.name, 'a');
    test.equal(result.params.elements[1].id.name, 'b');

    test.equal(result.name, null);
    $.id(test, result.body, 'x')

    test.done();
};

exports.function_without_name = function(test) {
    var result = testParser(lexer.lex("function\\ x -> { return x; };"));
    
    test.equal(result.type, 'FunctionExpression');
    test.equal(result.name, null);
    test.equal(result.params.elements.length, 1);
    $.idPattern(test, result.params.elements[0], 'x');
    test.equal(result.body.body[0].type, 'ReturnStatement');
    
    test.done();
};

exports.named_function = function(test) {
    var result = testParser(lexer.lex("function z\\x -> { return x; };"));
    test.equal(result.type, 'FunctionExpression');
    test.equal(result.id.name, 'z');
    test.equal(result.params.elements.length, 1);
    $.idPattern(test, result.params.elements[0], 'x');
    test.equal(result.body.body[0].type, 'ReturnStatement');
    
    test.done();
};
