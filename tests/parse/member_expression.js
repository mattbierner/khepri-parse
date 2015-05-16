var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var expr = parser.parseStream(stream);
    return expr.body[0].expression;
};

var validateSimpleMemberExpression = function(test, expr, object, property, computed) {
    test.equal(expr.type, 'MemberExpression');
    test.equal(expr.object.name, object);
    test.equal(expr.property.name, property);
    test.equal(expr.computed, computed);
};


exports.dot_accessor = function(test) {
    var expr = testParser(lexer.lex("a.b;"));
    validateSimpleMemberExpression(test, expr, 'a', 'b', false);
    
    test.done();
};

exports.keyword_value = function(test) {
    validateSimpleMemberExpression(test, testParser(lexer.lex("a.catch;")), 'a', 'catch', false);
    validateSimpleMemberExpression(test, testParser(lexer.lex("a.null;")), 'a', 'null', false);
    validateSimpleMemberExpression(test, testParser(lexer.lex("a.true;")), 'a', 'true', false);
    validateSimpleMemberExpression(test, testParser(lexer.lex("a.false;")), 'a', 'false', false);

    test.done();
};

exports.dot_accessor_associativity = function(test) {
    var expr = testParser(lexer.lex("a.b.c;"));
    test.equal(expr.type, 'MemberExpression');
    test.equal(expr.object.type, 'MemberExpression');
    
    validateSimpleMemberExpression(test, expr.object, 'a', 'b', false);
    
    test.equal(expr.property.name, 'c');
    test.equal(expr.computed, false);

    test.done();
};

exports.computed_accessor = function(test) {
    var expr = testParser(lexer.lex("a.(b);"));
    validateSimpleMemberExpression(test, expr, 'a', 'b', true);

    test.done();
};

exports.computed_accessor_associativity = function(test) {
    var expr = testParser(lexer.lex("a.(b).(c);"));
    test.equal(expr.type, 'MemberExpression');
    test.equal(expr.object.type, 'MemberExpression');
    
    validateSimpleMemberExpression(test, expr.object, 'a', 'b', true);

    test.equal(expr.property.name, 'c');
    test.equal(expr.computed, true);

    test.done();
};
