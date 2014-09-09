var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;
var $ = require('../$');

var testParser = function(program) {
    var expr = parser.parseStream(lexer.lex(program));
    return expr.body[0].expression;
};


exports.single_non_computed = function(test) {
    var expr = testParser(".x;");
    
    test.equal(expr.type, 'OperatorExpression');
    test.equal(expr.operator.type, 'MemberExpression');
    test.equal(expr.operator.computed, false);
    $.id(test, expr.operator.property, 'x');
    test.equal(expr.operator.object, null);

    test.done();
};

exports.single_computed = function(test) {
    var expr = testParser(".(0);");
    
    test.equal(expr.type, 'OperatorExpression');
    test.equal(expr.operator.type, 'MemberExpression');
    test.equal(expr.operator.computed, true);
    test.equal(expr.operator.object, null);
    $.number(test, expr.operator.property, 0);

    test.done();
};

exports.multi_non_computed = function(test) {
    var expr = testParser(".a.bcd.e;");
    
    test.equal(expr.type, 'OperatorExpression');
    
    test.equal(expr.operator.type, 'MemberExpression');
    test.equal(expr.operator.computed, false);
    $.id(test, expr.operator.property, 'e');
    
    test.equal(expr.operator.object.type, 'MemberExpression');
    test.equal(expr.operator.object.computed, false);
    $.id(test, expr.operator.object.property, 'bcd');
    
    test.equal(expr.operator.object.object.type, 'MemberExpression');
    test.equal(expr.operator.object.object.computed, false);
    $.id(test, expr.operator.object.object.property, 'a');
    test.equal(expr.operator.object.object.object, null);

    test.done();
};

exports.multi_computed = function(test) {
    var expr = testParser(".(0).(1 + 2).(3);");
    
    test.equal(expr.type, 'OperatorExpression');
    
    test.equal(expr.operator.type, 'MemberExpression');
    test.equal(expr.operator.computed, true);
    $.number(test, expr.operator.property, 3);
    
    test.equal(expr.operator.object.type, 'MemberExpression');
    test.equal(expr.operator.object.computed, true);
    test.equal(expr.operator.object.property.type, 'BinaryExpression');
    $.number(test, expr.operator.object.property.left, 1);
    $.number(test, expr.operator.object.property.right, 2);

    test.equal(expr.operator.object.object.type, 'MemberExpression');
    test.equal(expr.operator.object.object.computed, true);
    $.number(test, expr.operator.object.object.property, 0);
    test.equal(expr.operator.object.object.object, null);

    test.done();
};

exports.single_call= function(test) {
    var expr = testParser(".f(0);");
    
    test.equal(expr.type, 'OperatorExpression');
    test.equal(expr.operator.type, 'CallExpression');
    
    test.equal(expr.operator.callee.type, 'MemberExpression');
    $.id(test, expr.operator.callee.property, 'f');
    
    test.equal(expr.operator.object, null);

    test.done();
};
