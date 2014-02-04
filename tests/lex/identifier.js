var parse = require('bennu').parse;
var identifier_lexer = require('../../index').lex.identifier_lexer;


exports.baicIdentifier = function(test) {
    test.deepEqual(
        parse.run(identifier_lexer.identifier, 'a0bc'),
        'a0bc');
    
    test.deepEqual(
        parse.run(identifier_lexer.identifier, 'a0bc efd'),
        'a0bc');
    
    test.done();
};

exports.failStartDigit = function(test) {
    test.throws(
        parse.run.bind(undefined, identifier_lexer.identifier, '0abc'));
    
    test.done();
};

exports.reservedWorsd = function(test) {
    test.throws(
        parse.run.bind(undefined, identifier_lexer.identifier, 'while'));
    
    test.deepEqual(
        parse.run(identifier_lexer.identifier, 'While'),
        'While');
    
    test.deepEqual(
        parse.run(identifier_lexer.identifier, 'awhile'),
        'awhile');
    
    test.done();
};

exports.startChars = function(test) {
    test.deepEqual(
        parse.run(identifier_lexer.identifier, '$ab$c$'),
        '$ab$c$');
    
    test.deepEqual(
        parse.run(identifier_lexer.identifier, '_ab_c_'),
        '_ab_c_');
    
    test.done();
};

exports.doesNotCapturePuctuation = function(test) {
    test.deepEqual(
        parse.run(identifier_lexer.identifier, 'a.c.d'),
        'a');
    
    test.deepEqual(
        parse.run(identifier_lexer.identifier, 'a(c)'),
        'a');
    
    test.deepEqual(
        parse.run(identifier_lexer.identifier, 'a+'),
        'a');
    
    test.deepEqual(
        parse.run(identifier_lexer.identifier, 'a\\'),
        'a');
    
    test.done();
};