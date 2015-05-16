var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;
var $ = require('../$');

var testParser = function(program) {
    var expr = parser.parseStream(lexer.lex(program));
    return expr.body[0].expression;
};


exports.simple= function(test) {
    var expr = testParser("a(b);");
    
    test.equal(expr.type, 'CallExpression');
    
    test.equal(expr.callee.type, 'Identifier');
    $.id(test, expr.callee, 'a');
    
    test.equal(expr.args.length, 1);
    $.id(test, expr.args[0], 'b');
    
    test.done();
};

exports.call_expression_associativity = function(test) {
    var expr = testParser("a(b)(c);");
    
    test.equal(expr.type, 'CallExpression');
    test.equal(expr.callee.type, 'CallExpression');
    test.equal(expr.callee.callee.name, 'a');
    test.equal(expr.callee.args.length, 1);
    test.equal(expr.callee.args[0].name, 'b');
    test.equal(expr.args.length, 1);
    test.equal(expr.args[0].name, 'c');
    
    test.done();
};