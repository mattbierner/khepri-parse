var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var result = parser.parseStream(stream);
    return result.body[0].expression.bindings[0].pattern;
};


exports.single = function(test) {
    var result = testParser(lexer.lex("let {a} = {} in a;"));
    
    test.equal(result.type, 'ObjectPattern');
    test.equal(result.elements.length, 1);
    test.equal(result.checked, false);

    test.equal(result.elements[0].type, 'ObjectPatternElement');
    test.equal(result.elements[0].key.id.name, 'a');
    test.equal(result.elements[0].target, null);

    test.done();
};

exports.empty_fails = function(test) {
    test.throws(
        testParser.bind(null, lexer.lex("let {} = {} in a;")));
    
    test.done();
};

exports.checked = function(test) {
    var result = testParser(lexer.lex("let ?{a} = {} in a;"));
    
    test.equal(result.type, 'ObjectPattern');
    test.equal(result.elements.length, 1);
    test.equal(result.checked, true);

    test.equal(result.elements[0].type, 'ObjectPatternElement');
    test.equal(result.elements[0].key.type, 'IdentifierPattern');
    test.equal(result.elements[0].key.id.name, 'a');
    test.equal(result.elements[0].target, null);

    test.done();
};

exports.alias_string_key = function(test) {
    var result = testParser(lexer.lex("let {'+'#a} = {} in a;"));
    
    test.equal(result.type, 'ObjectPattern');
    test.equal(result.elements.length, 1);
    test.equal(result.checked, false);

    test.equal(result.elements[0].type, 'ObjectPatternElement');
    test.equal(result.elements[0].key.type, 'Literal');
    test.equal(result.elements[0].key.kind, 'string');
    test.equal(result.elements[0].key.value, '+');
    test.equal(result.elements[0].target.type, 'IdentifierPattern');
    test.equal(result.elements[0].target.id.name, 'a');

    test.done();
};

exports.multi = function(test) {
    var result = testParser(lexer.lex("let {a b c} = [] in a;"));
    
    test.equal(result.type, 'ObjectPattern');
    test.equal(result.elements.length, 3);

    test.equal(result.elements[0].type, 'ObjectPatternElement');
    test.equal(result.elements[0].key.id.name, 'a');
    
    test.equal(result.elements[1].type, 'ObjectPatternElement');
    test.equal(result.elements[1].key.id.name, 'b');
    
    test.equal(result.elements[2].type, 'ObjectPatternElement');
    test.equal(result.elements[2].key.id.name, 'c');
    
    test.done();
};

exports.nested = function(test) {
    var result = testParser(lexer.lex("let {'+'#{a}} = [] in a;"));
    
    test.equal(result.type, 'ObjectPattern');
    test.equal(result.elements.length, 1);

    test.equal(result.elements[0].type, 'ObjectPatternElement');
    test.equal(result.elements[0].key.type, 'Literal');
    test.equal(result.elements[0].key.kind, 'string');
    test.equal(result.elements[0].key.value, '+');
    
    test.equal(result.elements[0].target.type, 'ObjectPattern');
    test.equal(result.elements[0].target.elements.length, 1);
    test.equal(result.elements[0].target.elements[0].type, 'ObjectPatternElement');
    test.equal(result.elements[0].target.elements[0].key.id.name, 'a');

    test.done();
};