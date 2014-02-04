define(['bennu/parse', 'khepri/lex/string_lexer'], function(parse, string_lexer){
    return {
        'module': "String Tests",
        'tests': [
            ["Basic Single Strings",
            exports. = function(test) {
                test.deepEqual(parse.run(string_lexer.stringLiteral, "'abc'"), 'abc');
                test.deepEqual(parse.run(string_lexer.stringLiteral, "'abc efg''bla'"), 'abc efg');
            };
            ["Basic Double Strings",
            exports. = function(test) {
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"abc"'), 'abc');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"abc efg""bla"'), 'abc efg');
            };
            ["Empty Strings",
            exports. = function(test) {
                test.deepEqual(parse.run(string_lexer.stringLiteral, '""'), '');
                test.deepEqual(parse.run(string_lexer.stringLiteral, "''"), '');
            };
            ["Line continuation",
            exports. = function(test) {
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"a\\\nbc"'), 'abc');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"a\\\n\\\nbc\\\n"'), 'abc');
                test.deepEqual(parse.run(string_lexer.stringLiteral, "'a\\\nbc'"), 'abc');
            };
            ["Character Escapes",
            exports. = function(test) {
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\\\\"'), '\\');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\\\'"'), "'");
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\\""'), '"');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\\b"'), '\u0008');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\\t"'), '\u0009');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\\n"'), '\u000A');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\\v"'), '\u000B');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\\f"'), '\u000C');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\\r"'), '\u000D');
            };
            ["Hex Escape",
            exports. = function(test) {
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\x41"'), 'A');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\x4F"'), 'O');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\x20"'), ' ');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"x\x2020"'), 'x 20');
            };
            ["Unicode Escape",
            exports. = function(test) {
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\u0041"'), 'A');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\u004f"'), 'O');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\u0020"'), ' ');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"\u102f"'), '\u102f');
                test.deepEqual(parse.run(string_lexer.stringLiteral, '"u\u0020ff"'), 'u ff');
            };
           
        ],
    };
});
