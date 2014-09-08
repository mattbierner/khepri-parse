var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var expr = parser.parseStream(stream);
    return expr.body[0].expression;
};

var validateSimpleMemberExpression = function(test, expr, object, property, computed, checked) {
    test.equal(expr.type, 'MemberExpression');
    test.equal(expr.object.name, object);
    test.equal(expr.property.name, property);
    test.equal(expr.computed, computed);
    test.equal(expr.checked, checked);
};

exports.dot_accessor = function(test) {
    var expr = testParser(lexer.lex("a.b;"));
    validateSimpleMemberExpression(test, expr, 'a', 'b', false, false);
    
    test.done();
};

exports.checked_dot_accessor = function(test) {
    var expr = testParser(lexer.lex("a.?b;"));
    validateSimpleMemberExpression(test, expr, 'a', 'b', false, true);

    test.done();
};

exports.dot_accessor_associativity = function(test) {
    var expr = testParser(lexer.lex("a.b.c;"));
    test.equal(expr.type, 'MemberExpression');
    test.equal(expr.object.type, 'MemberExpression');
    
    validateSimpleMemberExpression(test, expr.object, 'a', 'b', false, false);
    
    test.equal(expr.property.name, 'c');
    test.equal(expr.computed, false);
    test.equal(expr.checked, false);

    test.done();
};

exports.dot_checked_accessor_associativity = function(test) {
    var expr = testParser(lexer.lex("a.b.?c;"));
    test.equal(expr.type, 'MemberExpression');
    test.equal(expr.object.type, 'MemberExpression');
    
    validateSimpleMemberExpression(test, expr.object, 'a', 'b', false, false);
    
    test.equal(expr.property.name, 'c');
    test.equal(expr.computed, false);
    test.equal(expr.checked, true);

    test.done();
};

exports.computed_accessor = function(test) {
    var expr = testParser(lexer.lex("a.(b);"));
    validateSimpleMemberExpression(test, expr, 'a', 'b', true, false);

    test.done();
};

exports.computed_checked_accessor = function(test) {
    var expr = testParser(lexer.lex("a.?(b);"));
    validateSimpleMemberExpression(test, expr, 'a', 'b', true, true);

    test.done();
};

exports.computed_accessor_associativity = function(test) {
    var expr = testParser(lexer.lex("a.(b).(c);"));
    test.equal(expr.type, 'MemberExpression');
    test.equal(expr.object.type, 'MemberExpression');
    
    validateSimpleMemberExpression(test, expr.object, 'a', 'b', true, false);

    test.equal(expr.property.name, 'c');
    test.equal(expr.computed, true);
    test.equal(expr.checked, false);

    test.done();
};


exports.computed_checked_accessor_associativity = function(test) {
    var expr = testParser(lexer.lex("a.(b).?(c);"));
    test.equal(expr.type, 'MemberExpression');
    test.equal(expr.object.type, 'MemberExpression');
    
    validateSimpleMemberExpression(test, expr.object, 'a', 'b', true, false);

    test.equal(expr.property.name, 'c');
    test.equal(expr.computed, true);
    test.equal(expr.checked, true);

    test.done();
};
