define(['bennu/parse', 'khepri/lex/line_terminator_lexer'], function(parse, line_terminator_lexer){
    
    return {
        'module': "Line Terminator Tests",
        'tests': [
            ["Line Feed",
            exports. = function(test) {
                test.equal(parse.run(line_terminator_lexer.lf, '\u000A'), '\u000A');
            };
            ["Carriage Return",
            exports. = function(test) {
                test.equal(parse.run(line_terminator_lexer.cr, '\u000D'), '\u000D');
            };
            ["Line Separator",
            exports. = function(test) {
                test.equal(parse.run(line_terminator_lexer.ls, '\u2028'), '\u2028');
            };
            ["Paragraph Separator",
            exports. = function(test) {
                test.equal(parse.run(line_terminator_lexer.ps, '\u2029'), '\u2029');
            };
            ["Line Terminator",
            exports. = function(test) {
                test.equal(parse.run(line_terminator_lexer.lineTerminator, '\u000A'), '\u000A');
                test.equal(parse.run(line_terminator_lexer.lineTerminator, '\u000D'), '\u000D');
                test.equal(parse.run(line_terminator_lexer.lineTerminator, '\u2028'), '\u2028');
                test.equal(parse.run(line_terminator_lexer.lineTerminator, '\u2029'), '\u2029');
            };
            ["Line Terminator Sequence",
            exports. = function(test) {
                test.equal(parse.run(line_terminator_lexer.lineTerminatorSequence, '\u000A'), '\u000A');
                test.equal(parse.run(line_terminator_lexer.lineTerminatorSequence, '\u2028'), '\u2028');
                test.equal(parse.run(line_terminator_lexer.lineTerminatorSequence, '\u2029'), '\u2029');
                
                // CR
                test.equal(parse.run(line_terminator_lexer.lineTerminatorSequence, '\u000D'), '\u000D');
                test.equal(parse.run(line_terminator_lexer.lineTerminatorSequence, '\u000Dabc'), '\u000D');
                test.equal(parse.run(line_terminator_lexer.lineTerminatorSequence, '\u000D\u000A'), '\u000D\u000A');

            };
        ],
    };
});
