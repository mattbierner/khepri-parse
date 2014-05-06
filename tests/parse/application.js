var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var result = parser.parseStream(lexer.lex(stream));
    return result.body[0].expression;
};

exports.assoc = function(test) {
    var result = testParser("f 1 2 3;");
    test.equal(result.type, 'CallExpression');
    
    test.equal(result.args.length, 1);
    test.equal(result.args[0].type, 'Literal');
    test.equal(result.args[0].value, 3);

    test.equal(result.callee.type, 'CallExpression');
    test.equal(result.callee.args[0].type, 'Literal');
    test.equal(result.callee.args[0].value, 2);
    
    test.equal(result.callee.callee.type, 'CallExpression');
    test.equal(result.callee.callee.args[0].type, 'Literal');
    test.equal(result.callee.callee.args[0].value, 1);
    
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
