var parse = require('bennu').parse;
var comment_lexer = require('../../index').lex.comment_lexer;


exports.basicSingleLineComment = function(test) {
    test.deepEqual(
        parse.run(comment_lexer.singleLineComment, '//abc efd'),
        'abc efd');
    
    test.deepEqual(
        parse.run(comment_lexer.singleLineComment, '//abc \nefd'),
        'abc ');
    
    test.done();
};

exports.emptySingleLineComment = function(test) {
    test.deepEqual(
        parse.run(comment_lexer.singleLineComment, '//'),
        '');
    
    test.deepEqual(
        parse.run(comment_lexer.singleLineComment, '//\ndasfdsa'),
        '');
    
    test.done();
};

exports.singleLineNestedSlash = function(test) {
    test.deepEqual(
        parse.run(comment_lexer.singleLineComment, '///'),
        '/');
    
    test.deepEqual(
        parse.run(comment_lexer.singleLineComment, '////'),
        '//');
    test.deepEqual(
        parse.run(comment_lexer.singleLineComment, '//a//ad/\n/a'),
        'a//ad/');
    
    test.done();
};

exports.basicMultiLineComment = function(test) {
    test.deepEqual(
        parse.run(comment_lexer.multiLineComment, '/*abc*/'),
        'abc');
    
    test.deepEqual(
        parse.run(comment_lexer.multiLineComment, '/*a b\nc*/'),
        'a b\nc');
    
    test.deepEqual(
        parse.run(comment_lexer.multiLineComment, '/*abc*/fdsafsda'),
        'abc');
    
    test.done();
};

exports.emptyMultiLineComment = function(test) {
    test.deepEqual(
        parse.run(comment_lexer.multiLineComment, '/**/'),
        '');
    
    test.deepEqual(
        parse.run(comment_lexer.multiLineComment,'/**/\ndfasds'),
        '');
    
    test.deepEqual(
        parse.run(comment_lexer.multiLineComment, '/*\n*/'),
        '\n');
    
    test.done();

};

exports.multiLineCommentNested = function(test) {
    test.deepEqual(
        parse.run(comment_lexer.multiLineComment, '/***/'),
        '*');
    test.deepEqual(
        parse.run(comment_lexer.multiLineComment, '/*/*/'),
        '/');
    test.done();
};