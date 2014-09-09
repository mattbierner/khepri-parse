var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var result = parser.parseStream(lexer.lex(stream));
    return result.body[0].expression.bindings[0].pattern;
};


exports.single = function(test) {
    var result = testParser("let [a] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 1);
    test.equal(result.checked, false);

    test.equal(result.elements[0].type, 'IdentifierPattern');
    test.equal(result.elements[0].id.name, 'a');
    
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

    test.equal(result.elements[0].type, 'IdentifierPattern');
    test.equal(result.elements[0].id.name, 'a');
    
    test.done();
};

exports.multi = function(test) {
    var result = testParser("let [a b c] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 3);

    test.equal(result.elements[0].type, 'IdentifierPattern');
    test.equal(result.elements[0].id.name, 'a');
    
    test.equal(result.elements[1].type, 'IdentifierPattern');
    test.equal(result.elements[1].id.name, 'b');
    
    test.equal(result.elements[2].type, 'IdentifierPattern');
    test.equal(result.elements[2].id.name, 'c');
    
    test.done();
};

exports.sink = function(test) {
    var result = testParser("let [a _ b _ c] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 5);

    test.equal(result.elements[0].type, 'IdentifierPattern');
    test.equal(result.elements[0].id.name, 'a');
    
    test.equal(result.elements[1].type, 'SinkPattern');
    
    test.equal(result.elements[2].type, 'IdentifierPattern');
    test.equal(result.elements[2].id.name, 'b');
    
    test.equal(result.elements[3].type, 'SinkPattern');

    test.equal(result.elements[4].type, 'IdentifierPattern');
    test.equal(result.elements[4].id.name, 'c');
    
    test.done();
};

exports.sub_patterns = function(test) {
    var result = testParser("let [a [b]] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 2);

    test.equal(result.elements[0].type, 'IdentifierPattern');
    test.equal(result.elements[0].id.name, 'a');
    
    test.equal(result.elements[1].type, 'ArrayPattern');
    test.equal(result.elements[1].elements.length, 1);
    
    test.equal(result.elements[1].elements[0].type, 'IdentifierPattern');
    test.equal(result.elements[1].elements[0].id.name, 'b');
    
    test.done();
};

exports.single_ellipsis = function(test) {
    var result = testParser("let [...a] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 1);

    test.equal(result.elements[0].type, 'EllipsisPattern');
    test.equal(result.elements[0].id.id.name, 'a');
    
    test.done();
};

exports.ellipsis_with_pre = function(test) {
    var result = testParser("let [a b ...c] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 3);

    test.equal(result.elements[0].type, 'IdentifierPattern');
    test.equal(result.elements[0].id.name, 'a');
    
    test.equal(result.elements[1].type, 'IdentifierPattern');
    test.equal(result.elements[1].id.name, 'b');
    
    test.equal(result.elements[2].type, 'EllipsisPattern');
    test.equal(result.elements[2].id.id.name, 'c');
    
    test.done();
};

exports.ellipsis_with_post = function(test) {
    var result = testParser("let [...a b c] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 3);
    
    test.equal(result.elements[0].type, 'EllipsisPattern');
    test.equal(result.elements[0].id.id.name, 'a');
    
    test.equal(result.elements[1].type, 'IdentifierPattern');
    test.equal(result.elements[1].id.name, 'b');
    
    test.equal(result.elements[2].type, 'IdentifierPattern');
    test.equal(result.elements[2].id.name, 'c');
    
    test.done();
};
exports.ellipsis_with_pre_and_post = function(test) {
    var result = testParser("let [a b ...c d e] = [] in a;");
    
    test.equal(result.type, 'ArrayPattern');
    test.equal(result.elements.length, 5);

    test.equal(result.elements[0].type, 'IdentifierPattern');
    test.equal(result.elements[0].id.name, 'a');
    
    test.equal(result.elements[1].type, 'IdentifierPattern');
    test.equal(result.elements[1].id.name, 'b');
    
    test.equal(result.elements[2].type, 'EllipsisPattern');
    test.equal(result.elements[2].id.id.name, 'c');
    
    test.equal(result.elements[3].type, 'IdentifierPattern');
    test.equal(result.elements[3].id.name, 'd');
    
    test.equal(result.elements[4].type, 'IdentifierPattern');
    test.equal(result.elements[4].id.name, 'e');
    
    test.done();
};

exports.many_ellipsis_throws = function(test) {
    test.throws(
        testParser.bind(null, "let [...a ...b] = [] in a;"));
    
    test.done();
};