define(['bennu/parse', 'nu-stream/stream', 'khepri/lex/lexer', 'khepri/parse/parser', 'khepri/parse/statement_parser'], function(parse, stream, lexer, parser, statement){
    
    var testParser = function(stream) {
        var result = parser.parseStream(stream);
        return result.body[0];
    };
    
    return {
        'module': "Statement Tests",
        'tests': [
            ["Debugger",
            exports. = function(test) {
                var result = testParser(lexer.lex("debugger;"));
                test.equal(result.type, "DebuggerStatement");
            };
            
            ["Empty Block",
            exports. = function(test) {
                var result = testParser(lexer.lex("{}"));
                test.equal(result.type, "BlockStatement");
                test.ok(result.body.length === 0);
            };
            ["Non Empty Block",
            exports. = function(test) {
                var result = testParser(lexer.lex("{debugger;{}debugger;}"));
                test.equal(result.type, "BlockStatement");
                test.ok(result.body.length === 3);
                test.equal(result.body[0].type, "DebuggerStatement");
                test.equal(result.body[1].type, "BlockStatement");
                test.equal(result.body[2].type, "DebuggerStatement");
            };
            
            ["Single Variable Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("var a;")));
                test.equal(result.type, "VariableDeclaration");
                test.deepEqual(result.declarations.length, 1);
                test.deepEqual(result.declarations[0].id.name, 'a');
                test.ok(!result.declarations[0].init);
            };
            ["Single Initilizer Variable Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("var a = 1;")));
                test.equal(result.type, "VariableDeclaration");
                test.deepEqual(result.declarations.length, 1);
                test.deepEqual(result.declarations[0].id.name, 'a');
                test.deepEqual(result.declarations[0].init.value, 1);
            };
            ["Multi Variable Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("var a = 1, b;")));
                test.equal(result.type, "VariableDeclaration");
                test.deepEqual(result.declarations.length, 2);
                test.deepEqual(result.declarations[0].id.name, 'a');
                test.deepEqual(result.declarations[0].init.value, 1);
                test.deepEqual(result.declarations[1].id.name, 'b');
                test.ok(!result.declarations[1].init);
            };
            
            ["Simple if Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("if (a) debugger;")));
                test.equal(result.type, "IfStatement");
                test.equal(result.test.name, 'a');
                test.equal(result.consequent.type, 'DebuggerStatement');
                test.ok(!result.alternate);
            };
            ["Simple if Block Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("if (a) { debugger; return 3; }")));
                test.equal(result.type, "IfStatement");
                test.equal(result.test.name, 'a');
                test.equal(result.consequent.type, 'BlockStatement');
                test.equal(result.consequent.body[0].type, 'DebuggerStatement');
                test.equal(result.consequent.body[1].type, 'ReturnStatement');
                test.ok(!result.alternate);
            };
            ["Simple if else Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("if (a) debugger; else ;")));
                test.equal(result.type, "IfStatement");
                test.equal(result.test.name, 'a');
                test.equal(result.consequent.type, 'DebuggerStatement');
                test.equal(result.alternate.type, 'EmptyStatement');
            };
            
            ["Simple Do While Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("do debugger; while (a);")));
                test.equal(result.type, "DoWhileStatement");
                test.equal(result.test.name, 'a');
                test.equal(result.body.type, 'DebuggerStatement');
            };
            ["Do While While Body Test",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("do while (a) debugger; while (b);")));
                test.equal(result.type, "DoWhileStatement");
                test.equal(result.test.name, 'b');
                test.equal(result.body.type, 'WhileStatement');
            };
            
            ["Simple While Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("while (a) debugger;")));
                test.equal(result.type, "WhileStatement");
                test.equal(result.test.name, 'a');
                test.equal(result.body.type, 'DebuggerStatement');
            };
            ["While Statement Do While Body Test",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("while (a) do debugger; while (b);")));
                test.equal(result.type, "WhileStatement");
                test.equal(result.test.name, 'a');
                test.equal(result.body.type, 'DoWhileStatement');
            };
            
            ["Simple For Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("for (a; b; c) debugger;")));
                test.equal(result.type, "ForStatement");
                test.equal(result.init.name, 'a');
                test.equal(result.test.name, 'b');
                test.equal(result.update.name, 'c');
                test.equal(result.body.type, 'DebuggerStatement');
            };
            ["For Statement Empty Init",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("for (; b; c) debugger;")));
                test.equal(result.type, "ForStatement");
                test.ok(!result.init);
                test.equal(result.test.name, 'b');
                test.equal(result.update.name, 'c');
                test.equal(result.body.type, 'DebuggerStatement');
            };
            ["For Statement Empty Test",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("for (; ; c) debugger;")));
                test.equal(result.type, "ForStatement");
                test.ok(!result.init);
                test.ok(!result.test);
                test.equal(result.update.name, 'c');
                test.equal(result.body.type, 'DebuggerStatement');
            };
            ["For Statement Empty Update",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("for (;;) debugger;")));
                test.equal(result.type, "ForStatement");
                test.ok(!result.init);
                test.ok(!result.test);
                test.ok(!result.update);
                test.equal(result.body.type, 'DebuggerStatement');
            };
            ["For Statement Var Init",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("for (var a = 3; b; c) debugger;")));
                test.equal(result.type, "ForStatement");
                test.equal(result.init.type, 'VariableDeclaration');
                test.equal(result.init.declarations[0].id.name, 'a');
                test.equal(result.init.declarations[0].init.value, 3);
                test.equal(result.test.name, 'b');
                test.equal(result.update.name, 'c');
                test.equal(result.body.type, 'DebuggerStatement');
            };
            
            ["Simple Continue Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("continue;")));
                test.equal(result.type, "ContinueStatement");
                test.ok(!result.label);
            };

            ["Simple Break Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("break;")));
                test.equal(result.type, "BreakStatement");
                test.ok(!result.label);
            };
            
            ["Simple Return Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("return;")));
                test.equal(result.type, "ReturnStatement");
                test.ok(!result.argument);
            };
            ["Simple Return Statement With Value",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("return 3;")));
                test.equal(result.type, "ReturnStatement");
                test.equal(result.argument.value, 3);
            };
            
            ["Simple Switch Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("switch (a) {}")));
                test.equal(result.type, "SwitchStatement");
                test.equal(result.discriminant.name, 'a');
                test.deepEqual(result.cases, []);
            };
            ["Switch Statement With Cases",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("switch (a) { case x: break; case y: debugger; break; }")));
                test.equal(result.type, "SwitchStatement");
                test.equal(result.discriminant.name, 'a');
                test.equal(result.cases.length, 2);
                test.equal(result.cases[0].test.name, 'x');
                test.equal(result.cases[0].consequent[0].type, 'BreakStatement');
                test.equal(result.cases[1].test.name, 'y');
                test.equal(result.cases[1].consequent[0].type, 'DebuggerStatement');
                test.equal(result.cases[1].consequent[1].type, 'BreakStatement');
            };
            ["Switch Statement With Default",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("switch (a) { case x: break; case y: debugger; break;  default: break;  }")));
                test.equal(result.type, "SwitchStatement");
                test.equal(result.discriminant.name, 'a');
                test.equal(result.cases.length, 3);
                test.equal(result.cases[0].test.name, 'x');
                test.equal(result.cases[0].consequent[0].type, 'BreakStatement');
                test.equal(result.cases[1].test.name, 'y');
                test.equal(result.cases[1].consequent[0].type, 'DebuggerStatement');
                test.equal(result.cases[1].consequent[1].type, 'BreakStatement');
                test.ok(!result.cases[2].test);
            };
            ["Switch Statement With Fallthrough Cases",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("switch (a) { case x: case y: debugger; break; }")));
                test.equal(result.type, "SwitchStatement");
                test.equal(result.discriminant.name, 'a');
                test.equal(result.cases.length, 2);
                test.equal(result.cases[0].test.name, 'x');
                test.ok(!result.cases[0].consequent[0]);
                test.equal(result.cases[1].test.name, 'y');
                test.equal(result.cases[1].consequent[0].type, 'DebuggerStatement');
                test.equal(result.cases[1].consequent[1].type, 'BreakStatement');
            };
            
            ["Simple Throw Statement",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("throw a;")));
                test.equal(result.type, "ThrowStatement");
                test.equal(result.argument.name, 'a');
            };
            
            ["Simple Try Statement ",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("try {debugger;}")));
                test.equal(result.type, "TryStatement");
                test.equal(result.block.body.length, 1);
                test.equal(result.block.body[0].type, "DebuggerStatement");
            };
            ["Simple Try Statement With Finally",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("try {} finally { debugger; }")));
                test.equal(result.type, "TryStatement");
                test.equal(result.block.body.length, 0);
                test.equal(result.finalizer.body[0].type, "DebuggerStatement");
            };
             ["Simple Try Statement With Catch",
            exports. = function(test) {
                var stmt = testParser(parser.parserStream(lexer.lex("try {} catch (a) { debugger; }")));
                test.equal(stmt.type, "TryStatement");
                test.equal(stmt.block.body.length, 0);
                test.equal(stmt.handler.param.name, "a");
                test.equal(stmt.handler.body.body[0].type, "DebuggerStatement");
            };
            ["Simple Try Statement With Catch and Finally",
            exports. = function(test) {
                var result = testParser(parser.parserStream(lexer.lex("try {} finally { debugger; }")));
                test.equal(result.type, "TryStatement");
                test.equal(result.block.body.length, 0);
                test.equal(result.finalizer.body[0].type, "DebuggerStatement");
            };
        ],
    };
});
