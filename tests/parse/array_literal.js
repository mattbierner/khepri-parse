var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;
var $ = require('../$');

var testParser = function(stream) {
    var result = parser.parseStream(lexer.lex(stream));
    return result.body[0].expression;
};


exports.empty = function(test) {
    var result = testParser("[];");
    
    test.equal(result.elements.length, 0);
    
    test.done();
};


exports.single_element = function(test) {
    var result = testParser("[3];");
    
    test.equal(result.elements.length, 1);
    $.number(test, result.elements[0], 3);
    
    test.done();
};

exports.multi_element = function(test) {
    var result = testParser("[3, 4];");
    
    test.equal(result.elements.length, 2);
    $.number(test, result.elements[0], 3);
    $.number(test, result.elements[1], 4);

    test.done();
};
