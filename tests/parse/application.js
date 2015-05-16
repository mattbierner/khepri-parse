var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;
var $ = require('../$');

var testParser = function(stream) {
    var result = parser.parseStream(lexer.lex(stream));
    return result.body[0].expression;
};

exports.assoc = function(test) {
    var result = testParser("f 1 2 3;");
    test.equal(result.type, 'CallExpression');
    
    test.equal(result.args.length, 1);
    $.number(test, result.args[0], 3);
    
    test.equal(result.callee.type, 'CallExpression');
    $.number(test, result.callee.args[0], 2);

    test.equal(result.callee.callee.type, 'CallExpression');
    $.number(test, result.callee.callee.args[0], 1);
 
    test.done();
};

exports.operator = function(test) {
    var result = testParser("f (+);");
    test.equal(result.type, 'CallExpression');
    test.equal(result.args.length, 1);
    test.equal(result.args[0].type, 'OperatorExpression');

    test.done();
};

exports.curried_operator = function(test) {
    var result = testParser("f (+, 1);");
    test.equal(result.type, 'CallExpression');
    test.equal(result.args.length, 1);
    test.equal(result.args[0].type, 'CurryExpression');
    test.equal(result.args[0].base.type, 'OperatorExpression');
    test.equal(result.args[0].args.length, 1);

    test.done();
};

exports.lambda = function(test) {
    var result = testParser("f \\ x -> x;");
    test.equal(result.type, 'CallExpression');
    
    test.equal(result.args.length, 1);
    test.equal(result.args[0].type, 'FunctionExpression');
    test.equal(result.args[0].params.elements.length, 1);
    $.idPattern(test, result.args[0].params.elements[0], 'x');

    test.done();
};
