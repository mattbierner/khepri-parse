define(['bennu/parse',
        'khepri/lex/lexer',
        'khepri/parse/parser',
        'khepri/parse/package_parser'],
function(parse,
        lexer,
        parser,
        package){
    
    var testParser = function(stream) {
        var result = parser.parseStream(stream);
        return result.body;
    };
    
    return {
        'module': "Package Parsers",
        'tests': [
            ["Simple Block Package",
            exports. = function(test) {
                var result = testParser(lexer.lex("package () { }"));
                test.equal(result.type, "Package");
                test.equal(result.exports.type, "PackageExports");
                test.equal(result.exports.exports.length, 0);
                test.equal(result.body.type, 'BlockStatement');
                test.equal(result.body.body.length, 0);
                
            };
            ["Simple With Package",
            exports. = function(test) {
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
            };
            ["Simple Exports",
            exports. = function(test) {
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
            }]
        ],
    };
});
