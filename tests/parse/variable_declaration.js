var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var result = parser.parseStream(stream);
    return result.body[0];
};


exports.single_variable_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("var a;")));
    test.equal(result.type, "VariableDeclaration");
    test.deepEqual(result.declarations.length, 1);
    test.deepEqual(result.declarations[0].id.name, 'a');
    test.ok(!result.declarations[0].init);
    test.ok(!result.declarations[0].immutable);
    test.ok(result.declarations[0].recursive);

    test.done();
};

exports.variable_statement_initilizer = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("var a = 1;")));
    test.equal(result.type, "VariableDeclaration");
    test.deepEqual(result.declarations.length, 1);
    test.deepEqual(result.declarations[0].id.name, 'a');
    test.deepEqual(result.declarations[0].init.value, 1);
    test.ok(!result.declarations[0].immutable);
    test.ok(result.declarations[0].recursive);
    test.done();
};

exports.multi_variable_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("var a = 1, b;")));
    test.equal(result.type, "VariableDeclaration");
    test.deepEqual(result.declarations.length, 2);
    test.deepEqual(result.declarations[0].id.name, 'a');
    test.deepEqual(result.declarations[0].init.value, 1);
    test.deepEqual(result.declarations[1].id.name, 'b');
    test.ok(!result.declarations[1].init);
    
    test.done();
};

exports.immutable_recursive_variable_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("var a := 3;")));
    test.equal(result.type, "VariableDeclaration");
    test.deepEqual(result.declarations.length, 1);
    test.deepEqual(result.declarations[0].id.name, 'a');
    test.deepEqual(result.declarations[0].init.value, 3);
    test.ok(result.declarations[0].immutable);
    test.ok(result.declarations[0].recursive);

    test.done();
};

exports.immutable_nonrecursive_variable_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("var a =: 3;")));
    test.equal(result.type, "VariableDeclaration");
    test.deepEqual(result.declarations.length, 1);
    test.deepEqual(result.declarations[0].id.name, 'a');
    test.deepEqual(result.declarations[0].init.value, 3);
    test.ok(result.declarations[0].immutable);
    test.ok(!result.declarations[0].recursive);

    test.done();
};

exports.mixed_variable_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("var a := 1, b, c =3, d =: 4;")));
    test.equal(result.type, "VariableDeclaration");
    test.deepEqual(result.declarations.length, 4);
    
    test.deepEqual(result.declarations[0].id.name, 'a');
    test.deepEqual(result.declarations[0].init.value, 1);
    test.ok(result.declarations[0].immutable);
    test.ok(result.declarations[0].recursive);
    
    test.deepEqual(result.declarations[1].id.name, 'b');
    test.ok(!result.declarations[1].init);
    test.ok(!result.declarations[1].immutable);
    test.ok(result.declarations[1].recursive);
    
    test.deepEqual(result.declarations[2].id.name, 'c');
    test.deepEqual(result.declarations[2].init.value, 3);
    test.ok(!result.declarations[2].immutable);
    test.ok(result.declarations[2].recursive);
    
    test.deepEqual(result.declarations[3].id.name, 'd');
    test.deepEqual(result.declarations[3].init.value, 4);
    test.ok(result.declarations[3].immutable);
    test.ok(!result.declarations[3].recursive);
    
    
    test.done();
};
