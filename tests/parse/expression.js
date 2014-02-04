define(['bennu/parse',
        'nu-stream/stream',
        'khepri/lex/lexer',
        'khepri/parse/parser'],
function(parse,
        stream,
        lexer,
        parser) {
    
    var testParser = function(stream) {
        var expr = parser.parseStream(stream);
        return expr.body[0].expression;
    };
    
    return {
        'module': "Expression Tests",
        'tests': [

            ["Assignment Exression",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a = b + 3;"));
                test.equal(expr.type, 'AssignmentExpression');
                
                // Check Associativity
                test.equal(expr.left.name, 'a');
                test.equal(expr.right.type, 'BinaryExpression');
                test.equal(expr.right.left.name, 'b');
                test.equal(expr.right.right.value, '3');
            };
            
            ["Simple Conditional Expression",
            exports. = function(test) {
                var expr = testParser(lexer.lex("?a :b :c;"));
                test.equal(expr.type, 'ConditionalExpression');
                test.equal(expr.test.name, 'a');
                test.equal(expr.consequent.name, 'b');
                test.equal(expr.alternate.name, 'c');
            };
            ["Conditional Expression Associativity",
            exports. = function(test) {
                var expr = testParser(lexer.lex("?a :b :?c :d :e;"));
                test.equal(expr.type, 'ConditionalExpression');
                test.equal(expr.test.name, 'a');
                test.equal(expr.consequent.name, 'b');
                test.equal(expr.alternate.type, 'ConditionalExpression');
                test.equal(expr.alternate.test.name, 'c');
                test.equal(expr.alternate.consequent.name, 'd');
                test.equal(expr.alternate.alternate.name, 'e');
            };
            ["Conditional Expression ConditionalExpression in Consequent",
            exports. = function(test) {
                var expr = testParser(lexer.lex("?a :?b :c :d :e;"));
                test.equal(expr.type, 'ConditionalExpression');
                test.equal(expr.test.name, 'a');
                test.equal(expr.consequent.type, 'ConditionalExpression');
                test.equal(expr.consequent.test.name, 'b');
                test.equal(expr.consequent.consequent.name, 'c');
                test.equal(expr.consequent.alternate.name, 'd');
                test.equal(expr.alternate.name, 'e');
            };
            ["Conditional Expression ConditionalExpression in test",
            exports. = function(test) {
                var expr = testParser(lexer.lex("??a :b :c :d :e;"));
                test.equal(expr.type, 'ConditionalExpression');
                test.equal(expr.test.type, 'ConditionalExpression');
                test.equal(expr.test.test.name, 'a');
                test.equal(expr.test.consequent.name, 'b');
                test.equal(expr.test.alternate.name, 'c');
                test.equal(expr.consequent.name, 'd');
                test.equal(expr.alternate.name, 'e');
            };
            
            ["Simple Binary Expression",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a + b;"));
                test.equal(expr.type, 'BinaryExpression');
                test.equal(expr.operator, '+');
                test.equal(expr.left.name, 'a');
                test.equal(expr.right.name, 'b');
            };
            ["Binary Expression Left Associativity",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a + b + c;"));
                test.equal(expr.type, 'BinaryExpression');
                test.equal(expr.operator, '+');
                test.equal(expr.left.type, 'BinaryExpression');
                test.equal(expr.left.left.name, 'a');
                test.equal(expr.left.right.name, 'b');
                test.equal(expr.right.name, 'c');
            };
            ["Binary Expression Paren",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a + (b + c);"));
                test.equal(expr.type, 'BinaryExpression');
                test.equal(expr.operator, '+');
                test.equal(expr.left.name, 'a');
                test.equal(expr.right.type, 'BinaryExpression');
                test.equal(expr.right.operator, '+');
                test.equal(expr.right.left.name, 'b');
                test.equal(expr.right.right.name, 'c');
            };
            ["Binary Expression Precedence",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a + b * c;"));
                test.equal(expr.type, 'BinaryExpression');
                test.equal(expr.operator, '+');
                test.equal(expr.left.name, 'a');
                test.equal(expr.right.type, 'BinaryExpression');
                test.equal(expr.right.operator, '*');
                test.equal(expr.right.left.name, 'b');
                test.equal(expr.right.right.name, 'c');
            };
            
            ["Simple Unary Expression",
            exports. = function(test) {
                var expr = testParser(lexer.lex("!a;"));
                test.equal(expr.type, 'UnaryExpression');
                test.equal(expr.operator, '!');
                test.equal(expr.argument.name, 'a');
            };
            ["Unary Expression Right Associativity",
            exports. = function(test) {
                var expr = testParser(lexer.lex("~!a;"));
                test.equal(expr.type, 'UnaryExpression');
                test.equal(expr.operator, '~');
                test.equal(expr.argument.type, 'UnaryExpression');
                test.equal(expr.argument.operator, '!');
                test.equal(expr.argument.argument.name, 'a');
            };
           
            ["Simple New Expression",
            exports. = function(test) {
                var expr = testParser(lexer.lex("new a();"));
                test.equal(expr.type, 'NewExpression');
                test.equal(expr.callee.name, 'a');
                test.equal(expr.args.length, 0);
            };
            ["Many New Expression",
            exports. = function(test) {
                var expr = testParser(lexer.lex("new new a()();"));
                test.equal(expr.type, 'NewExpression');
                test.equal(expr.callee.type, 'NewExpression');
                test.equal(expr.callee.callee.name, 'a');
                test.equal(expr.callee.args.length, 0);
                test.equal(expr.args.length, 0);
            };
            ["New Expression Args",
            exports. = function(test) {
                var expr = testParser(lexer.lex("new a(1);"));
                test.equal(expr.type, 'NewExpression');
                test.equal(expr.callee.name, 'a');
                test.equal(expr.args.length, 1);
                test.equal(expr.args[0].value, 1);
            };
            ["Many New Expression Args",
            exports. = function(test) {
                var expr = testParser(lexer.lex("new new a(1)(2);"));
                test.equal(expr.type, 'NewExpression');
                test.equal(expr.callee.type, 'NewExpression');
                test.equal(expr.callee.callee.name, 'a');
                test.equal(expr.callee.args.length, 1);
                test.equal(expr.callee.args[0].value, 1);
                test.equal(expr.args.length, 1);
                test.equal(expr.args[0].value, 2);
            };
            
            ["Simple Call Expression ",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a();"));
                test.equal(expr.type, 'CallExpression');
                test.equal(expr.callee.name, 'a');
                test.equal(expr.args.length, 0);
            };
            ["Call Expression with args",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a(b);"));
                test.equal(expr.type, 'CallExpression');
                test.equal(expr.callee.name, 'a');
                test.equal(expr.args.length, 1);
                test.equal(expr.args[0].name, 'b');
            };
            ["Multiple Call Expression",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a(b)(c);"));
                test.equal(expr.type, 'CallExpression');
                test.equal(expr.callee.type, 'CallExpression');
                test.equal(expr.callee.callee.name, 'a');
                test.equal(expr.callee.args.length, 1);
                test.equal(expr.callee.args[0].name, 'b');
                test.equal(expr.args.length, 1);
                test.equal(expr.args[0].name, 'c');
            };
            
            ["Simple Dot Accessor",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a.b;"));
                test.equal(expr.type, 'MemberExpression');
                test.equal(expr.object.name, 'a');
                test.equal(expr.property.name, 'b');
                test.equal(expr.computed, false);
            };
            ["Many Dot Accessor Left Associativity",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a.b.c;"));
                test.equal(expr.type, 'MemberExpression');
                test.equal(expr.object.type, 'MemberExpression');
                test.equal(expr.object.object.name, 'a');
                test.equal(expr.object.property.name, 'b');
                test.equal(expr.object.computed, false);
                test.equal(expr.property.name, 'c');
                test.equal(expr.computed, false);
            };
            
            ["Simple Bracket Accessor",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a.(b);"));
                test.equal(expr.type, 'MemberExpression');
                test.equal(expr.object.name, 'a');
                test.equal(expr.property.name, 'b');
                test.equal(expr.computed, true);
            };
            ["Many Bracket Accessor Left Associativity",
            exports. = function(test) {
                var expr = testParser(lexer.lex("a.(b).(c);"));
                test.equal(expr.type, 'MemberExpression');
                test.equal(expr.object.type, 'MemberExpression');
                test.equal(expr.object.object.name, 'a');
                test.equal(expr.object.property.name, 'b');
                test.equal(expr.object.computed, true);
                test.equal(expr.property.name, 'c');
                test.equal(expr.computed, true);
            };
        ],
    };
});
