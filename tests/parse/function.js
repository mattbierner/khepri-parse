define(['bennu/parse',
        'khepri/lex/lexer',
        'khepri/parse/parser',
        'khepri/parse/program_parser'],
function(parse,
        lexer,
        parser,
        expression){
    
    var testParser = function(stream) {
        var result = parser.parseStream(stream);
        return result.body[0].expression;
    };
    
    return {
        'module': "Function Expression",
        'tests': [
            ["Empty Function Expression",
            exports. = function(test) {
                var result = testParser(lexer.lex("z = function \\() -> {};"));
                test.equal(result.right.type, 'FunctionExpression');
                test.equal(result.right.params.elements.length, 0);
                test.equal(result.right.name, null);
                test.equal(result.right.body.type, 'BlockStatement');
            };
            ["Simple Function Expression",
            exports. = function(test) {
                var result = testParser(lexer.lex("z = function\\ x ->{ return x; };"));
                test.equal(result.right.type, 'FunctionExpression');
                test.equal(result.right.name, null);
                test.equal(result.right.params.elements.length, 1);
                test.equal(result.right.params.elements[0].id.name, 'x');
                test.equal(result.right.body.body[0].type, 'ReturnStatement');
            };
            ["Named Function Expression",
            exports. = function(test) {
                var result = testParser(lexer.lex("z = function z\\x -> { return x; };"));
                test.equal(result.right.type, 'FunctionExpression');
                test.equal(result.right.id.name, 'z');
                test.equal(result.right.params.elements.length, 1);
                test.equal(result.right.params.elements[0].id.name, 'x');
                test.equal(result.right.body.body[0].type, 'ReturnStatement');
            };
        ],
    };
});
