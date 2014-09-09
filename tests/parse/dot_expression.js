var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;

var testParser = function(program) {
    var expr = parser.parseStream(lexer.lex(program));
    return expr.body[0].expression;
};


exports.single_non_computed = function(test) {
    var expr = testParser(".x;");
    
    test.equal(expr.type, 'UnaryExpression');
    test.equal(expr.operator.type, 'MemberExpression');
    test.equal(expr.operator.computed, false);
    test.equal(expr.operator.object, null);
    test.equal(expr.operator.property.type, 'Identifier');
    test.equal(expr.operator.property.name, 'x');

    test.done();
};

exports.single_computed = function(test) {
    var expr = testParser(".(0);");
    
    test.equal(expr.type, 'UnaryExpression');
    test.equal(expr.operator.type, 'MemberExpression');
    test.equal(expr.operator.computed, true);
    test.equal(expr.operator.object, null);
    test.equal(expr.operator.property.type, 'Literal');
    test.equal(expr.operator.property.kind, 'number');
    test.equal(expr.operator.property.value, 0);

    test.done();
};


exports.multi_non_computed = function(test) {
    var expr = testParser(".a.b.c;");
    
    test.equal(expr.type, 'UnaryExpression');
    test.equal(expr.operator.type, 'MemberExpression');
    test.equal(expr.operator.computed, false);
    test.equal(expr.operator.object, null);
    test.equal(expr.operator.property.type, 'Identifier');
    test.equal(expr.operator.property.name, 'c');

    test.done();
};