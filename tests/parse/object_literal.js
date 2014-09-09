var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;
var $ = require('../$');


var testParser = function(stream) {
    var result = parser.parseStream(stream);
    return result.body[0].expression;
};


exports.empty = function(test) {
    var result = testParser(lexer.lex("({});"));
    test.equal(result.properties.length, 0);
    
    test.done();
};

exports.init_values = function(test) {
    var result = testParser(lexer.lex("({ 'a': 0 , 'b': 1, '9': 2});"));
    test.equal(result.properties.length, 3);
    test.equal(result.properties[0].type, 'ObjectValue');
    $.string(test, result.properties[0].key, 'a');
    $.number(test, result.properties[0].value, 0);
    
    test.equal(result.properties[1].type, 'ObjectValue');
    $.string(test, result.properties[1].key, 'b');
    $.number(test, result.properties[1].value, 1);
    
    test.equal(result.properties[2].type, 'ObjectValue');
    $.string(test, result.properties[2].key, '9');
    $.number(test, result.properties[2].value, 2);
    
    test.done();
};