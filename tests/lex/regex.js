define(['bennu/parse', 'khepri/lex/regular_expression_lexer'], function(parse, regular_expression_lexer){
    
    var reEq = function(x, y) {
        return test.equal(x.toString(), y.toString());
    };
    
    return {
        'module': "Regular Expression Tests",
        'tests': [
            ["Basic Regex",
            exports. = function(test) {
                reEq(parse.run(regular_expression_lexer.regularExpressionLiteral, "`abc`"), /abc/);
                
                reEq(parse.run(regular_expression_lexer.regularExpressionLiteral, "`abc`i"), /abc/i);
                
                reEq(parse.run(regular_expression_lexer.regularExpressionLiteral, "`abc`igm"), /abc/igm);
            };
            ["Simple Class",
            exports. = function(test) {
                reEq(parse.run(regular_expression_lexer.regularExpressionLiteral, "`[abc]`"), /[abc]/);
                
                reEq(parse.run(regular_expression_lexer.regularExpressionLiteral, "`[^*. 3][]`"), /[^*. 3][]/);
            };
            ["Escape Class",
            exports. = function(test) {
                reEq(parse.run(regular_expression_lexer.regularExpressionLiteral, "`[\\]]`"), /[\]]/);
                
            };
            ["Escape Slash",
            exports. = function(test) {
                reEq(parse.run(regular_expression_lexer.regularExpressionLiteral, "`\\/ab`"), /\/ab/);
                
            };
            ["Escape Backtick",
            exports. = function(test) {
                reEq(parse.run(regular_expression_lexer.regularExpressionLiteral, "`\\`ab`"), /\`ab/);
            };
           
        ],
    };
});
