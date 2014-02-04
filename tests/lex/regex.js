var parse = require('bennu').parse;
var regular_expression_lexer = require('../../index').lex.regular_expression_lexer;


var reEq = function(test, x, y) {
    return test.equal(x.toString(), y.toString());
};

exports.basic_regex = function(test) {
    reEq(test,
        parse.run(regular_expression_lexer.regularExpressionLiteral, "`abc`"),
        /abc/);
    
    reEq(test,
        parse.run(regular_expression_lexer.regularExpressionLiteral, "`abc`i"),
        /abc/i);
    
    reEq(test,
        parse.run(regular_expression_lexer.regularExpressionLiteral, "`abc`igm"),
        /abc/igm);
    
    test.done();
};

exports.simple_class = function(test) {
    reEq(test,
        parse.run(regular_expression_lexer.regularExpressionLiteral, "`[abc]`"),
        /[abc]/);
    
    reEq(test,
        parse.run(regular_expression_lexer.regularExpressionLiteral, "`[^*. 3][]`"),
        /[^*. 3][]/);
    
    test.done();
};

exports.escape_class = function(test) {
    reEq(test,
        parse.run(regular_expression_lexer.regularExpressionLiteral, "`[\\]]`"),
        /[\]]/);
    
    test.done();
};


exports.escape_backtick = function(test) {
    reEq(test,
        parse.run(regular_expression_lexer.regularExpressionLiteral, "`\\`ab`"),
        /\`ab/);
    
    test.done();
};
