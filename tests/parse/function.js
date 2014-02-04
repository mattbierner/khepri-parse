var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var result = parser.parseStream(stream);
    return result.body[0].expression;
};


exports.empty_function = function(test) {
    var result = testParser(lexer.lex("z = function \\() -> {};"));
    test.equal(result.right.type, 'FunctionExpression');
    test.equal(result.right.params.elements.length, 0);
    test.equal(result.right.name, null);
    test.equal(result.right.body.type, 'BlockStatement');
    
    test.done();
};

exports.function_no_named = function(test) {
    var result = testParser(lexer.lex("z = function\\ x ->{ return x; };"));
    test.equal(result.right.type, 'FunctionExpression');
    test.equal(result.right.name, null);
    test.equal(result.right.params.elements.length, 1);
    test.equal(result.right.params.elements[0].id.name, 'x');
    test.equal(result.right.body.body[0].type, 'ReturnStatement');
    
    test.done();
};

exports.named_function = function(test) {
    var result = testParser(lexer.lex("z = function z\\x -> { return x; };"));
    test.equal(result.right.type, 'FunctionExpression');
    test.equal(result.right.id.name, 'z');
    test.equal(result.right.params.elements.length, 1);
    test.equal(result.right.params.elements[0].id.name, 'x');
    test.equal(result.right.body.body[0].type, 'ReturnStatement');
    
    test.done();
};
