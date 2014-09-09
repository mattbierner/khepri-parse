var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;
var $ = require('../$');

var testParser = function(stream) {
    var result = parser.parseStream(lexer.lex(stream));
    return result.body[0].expression.bindings[0].pattern;
};


exports.single = function(test) {
    var result = testParser("let [a] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 1);
    test.equal(result.checked, false);

    $.idPattern(test, result.elements[0], 'a');
    
    test.done();
};

exports.empty_fails = function(test) {
    test.throws(
        testParser.bind(null, "let [] = [] in a;"));
    
    test.done();
};

exports.checked = function(test) {
    var result = testParser("let ?[a] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 1);
    test.equal(result.checked, true);

    $.idPattern(test, result.elements[0], 'a');
    
    test.done();
};

exports.multi = function(test) {
    var result = testParser("let [a b c] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 3);

    $.idPattern(test, result.elements[0], 'a');
    $.idPattern(test, result.elements[1], 'b');
    $.idPattern(test, result.elements[2], 'c');
    
    test.done();
};

exports.sink = function(test) {
    var result = testParser("let [a _ b _ c] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 5);

    $.idPattern(test, result.elements[0], 'a');
    
    test.equal(result.elements[1].type, 'SinkPattern');
    
    $.idPattern(test, result.elements[2], 'b');
    
    test.equal(result.elements[3].type, 'SinkPattern');

    $.idPattern(test, result.elements[4], 'c');
    
    test.done();
};

exports.sub_patterns = function(test) {
    var result = testParser("let [a [b]] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 2);

    $.idPattern(test, result.elements[0], 'a');
    
    test.equal(result.elements[1].type, 'ArrayPattern');
    test.equal(result.elements[1].elements.length, 1);
    
    $.idPattern(test, result.elements[1].elements[0], 'b');
    
    test.done();
};

exports.single_ellipsis = function(test) {
    var result = testParser("let [...a] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 1);

    $.ellipsisPattern(test, result.elements[0], 'a');
    
    test.done();
};

exports.ellipsis_with_pre = function(test) {
    var result = testParser("let [a b ...c] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 3);

    $.idPattern(test, result.elements[0], 'a');
    $.idPattern(test, result.elements[1], 'b');
    $.ellipsisPattern(test, result.elements[2], 'c');
    
    test.done();
};

exports.ellipsis_with_post = function(test) {
    var result = testParser("let [...a b c] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 3);
    
    $.ellipsisPattern(test, result.elements[0], 'a');
    $.idPattern(test, result.elements[1], 'b');
    $.idPattern(test, result.elements[2], 'c');
    
    test.done();
};
exports.ellipsis_with_pre_and_post = function(test) {
    var result = testParser("let [a b ...c d e] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 5);

    $.idPattern(test, result.elements[0], 'a');
    $.idPattern(test, result.elements[1], 'b');
    $.ellipsisPattern(test, result.elements[2], 'c');
    $.idPattern(test, result.elements[3], 'd')
    $.idPattern(test, result.elements[4], 'e');
    
    test.done();
};

exports.many_ellipsis_throws = function(test) {
    test.throws(
        testParser.bind(null, "let [...a ...b] = [] in a;"));
    
    test.done();
};