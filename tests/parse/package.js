var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var result = parser.parseStream(stream);
    return result.body;
};


exports.package_block_body = function(test) {
    var result = testParser(lexer.lex("package () { }"));
    test.equal(result.type, "Package");
    test.equal(result.exports.type, "PackageExports");
    test.equal(result.exports.exports.length, 0);
    test.equal(result.body.type, 'BlockStatement');
    test.equal(result.body.body.length, 0);
    
    test.done();
};

exports.package_with_body = function(test) {
    var result = testParser(lexer.lex("package () with x = 3 in { }"));
    test.equal(result.type, "Package");
    test.equal(result.exports.type, "PackageExports");
    test.equal(result.exports.exports.length, 0);
    test.equal(result.body.type, 'WithStatement');
    test.equal(result.body.bindings.length, 1);
    test.equal(result.body.bindings[0].pattern.type, 'IdentifierPattern');
    test.equal(result.body.bindings[0].pattern.id.name, 'x');
    test.equal(result.body.bindings[0].value.type, 'Literal');
    test.equal(result.body.bindings[0].value.kind, 'number');
    test.equal(result.body.bindings[0].value.value, 3);

    test.equal(result.body.body.type, 'BlockStatement');
    test.equal(result.body.body.body.length, '0');
    
    test.done();
};

exports.exports = function(test) {
    var result = testParser(lexer.lex("package (min, max) { }"));
    test.equal(result.type, "Package");
    test.equal(result.exports.type, "PackageExports");
    test.equal(result.exports.exports.length, 2);
    test.equal(result.exports.exports[0].type, 'PackageExport');
    test.equal(result.exports.exports[0].id.type, 'Identifier');
    test.equal(result.exports.exports[0].id.name, 'min');
    test.equal(result.exports.exports[1].type, 'PackageExport');
    test.equal(result.exports.exports[1].id.type, 'Identifier');
    test.equal(result.exports.exports[1].id.name, 'max');
    test.equal(result.body.type, 'BlockStatement');
    test.equal(result.body.body.length, 0);
    
    test.done();
};

exports.symbol_export = function(test) {
    var result = testParser(lexer.lex("package ((+) max) { }"));
    test.equal(result.type, "Package");
    test.equal(result.exports.type, "PackageExports");
    test.equal(result.exports.exports.length, 2);
    test.equal(result.exports.exports[0].type, 'PackageExport');
    test.equal(result.exports.exports[0].id.type, 'BinaryOperator');
    test.equal(result.exports.exports[0].id.name, '+');
    test.equal(result.exports.exports[1].type, 'PackageExport');
    test.equal(result.exports.exports[1].id.type, 'Identifier');
    test.equal(result.exports.exports[1].id.name, 'max');
    test.equal(result.body.type, 'BlockStatement');
    test.equal(result.body.body.length, 0);
    
    test.done();
};


exports.top_level_exports = function(test) {
    var result = testParser(lexer.lex("package min { }"));
    test.equal(result.type, "Package");

    test.equal(result.exports.type, 'PackageExport');
    test.equal(result.exports.id.type, 'Identifier');
    test.equal(result.exports.id.name, 'min');
    test.equal(result.body.type, 'BlockStatement');
    test.equal(result.body.body.length, 0);
    
    test.done();
};

exports.top_level_symbol_exports = function(test) {
    var result = testParser(lexer.lex("package (+) { }"));
    test.equal(result.type, "Package");

    test.equal(result.exports.type, 'PackageExport');
    test.equal(result.exports.id.type, 'BinaryOperator');
    test.equal(result.exports.id.name, '+');
    test.equal(result.body.type, 'BlockStatement');
    test.equal(result.body.body.length, 0);
    
    test.done();
};
