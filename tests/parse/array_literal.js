var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var result = parser.parseStream(stream);
    return result.body[0].expression;
};


exports.empty = function(test) {
    var result = testParser(lexer.lex("[];"));
    test.equal(result.elements.length, 0);
    
    test.done();
};


exports.single_element = function(test) {
    var result = testParser(lexer.lex("[3];"));
    test.equal(result.elements.length, 1);
    test.equal(result.elements[0].value, 3);
    
    test.done();
};

exports.multi_element = function(test) {
    var result = testParser(lexer.lex("[3, 4];"));
    test.equal(result.elements.length, 2);
    test.equal(result.elements[0].value, 3);
    test.equal(result.elements[1].value, 4);

    test.done();
};
