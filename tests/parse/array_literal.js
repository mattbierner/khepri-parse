define(['bennu/parse',
        'khepri/lex/lexer',
        'khepri/parse/parser',
        'khepri/parse/expression_parser'],
function(parse,
        lexer,
        parser,
        expression){
    
    var testParser = function(stream) {
        var result = parser.parseStream(stream);
        return result.body[0].expression;
    };
    
    return {
        'module': "Array Literal Tests",
        'tests': [
            ["Empty Array Literal",
            exports. = function(test) {
                var result = testParser(lexer.lex("[];"));
                test.equal(result.elements.length, 0);
            };
            ["Single Element Array Literal",
            exports. = function(test) {
                var result = testParser(lexer.lex("[3];"));
                test.equal(result.elements.length, 1);
                test.equal(result.elements[0].value, 3);
            };
            ["Simple Multi Element Array Literal",
            exports. = function(test) {
                var result = testParser(lexer.lex("[3, 4];"));
                test.equal(result.elements.length, 2);
                test.equal(result.elements[0].value, 3);
                test.equal(result.elements[1].value, 4);
            };
        ],
    };
});
