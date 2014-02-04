var lexer = require('../../index').lex.lexer;
var parser = require('../../index').parse.parser;


var testParser = function(stream) {
    var result = parser.parseStream(stream);
    return result.body[0];
};


exports.debugger_statement = function(test) {
    var result = testParser(lexer.lex("debugger;"));
    test.equal(result.type, "DebuggerStatement");
    
    test.done();
};

exports.empty_block = function(test) {
    var result = testParser(lexer.lex("{}"));
    test.equal(result.type, "BlockStatement");
    test.ok(result.body.length === 0);
    
    test.done();
};

exports.simple_block = function(test) {
    var result = testParser(lexer.lex("{debugger;{}debugger;}"));
    test.equal(result.type, "BlockStatement");
    test.ok(result.body.length === 3);
    test.equal(result.body[0].type, "DebuggerStatement");
    test.equal(result.body[1].type, "BlockStatement");
    test.equal(result.body[2].type, "DebuggerStatement");
    
    test.done();
};

exports.single_variable_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("var a;")));
    test.equal(result.type, "VariableDeclaration");
    test.deepEqual(result.declarations.length, 1);
    test.deepEqual(result.declarations[0].id.name, 'a');
    test.ok(!result.declarations[0].init);
    
    test.done();
};

exports.variable_statement_initilizer = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("var a = 1;")));
    test.equal(result.type, "VariableDeclaration");
    test.deepEqual(result.declarations.length, 1);
    test.deepEqual(result.declarations[0].id.name, 'a');
    test.deepEqual(result.declarations[0].init.value, 1);
    
    test.done();
};

exports.multi_variable_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("var a = 1, b;")));
    test.equal(result.type, "VariableDeclaration");
    test.deepEqual(result.declarations.length, 2);
    test.deepEqual(result.declarations[0].id.name, 'a');
    test.deepEqual(result.declarations[0].init.value, 1);
    test.deepEqual(result.declarations[1].id.name, 'b');
    test.ok(!result.declarations[1].init);
    
    test.done();
};

exports.if_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("if (a) debugger;")));
    test.equal(result.type, "IfStatement");
    test.equal(result.test.name, 'a');
    test.equal(result.consequent.type, 'DebuggerStatement');
    test.ok(!result.alternate);
    
    test.done();
};

exports.if_statement_block_body = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("if (a) { debugger; return 3; }")));
    test.equal(result.type, "IfStatement");
    test.equal(result.test.name, 'a');
    test.equal(result.consequent.type, 'BlockStatement');
    test.equal(result.consequent.body[0].type, 'DebuggerStatement');
    test.equal(result.consequent.body[1].type, 'ReturnStatement');
    test.ok(!result.alternate);
    
    test.done();
};

exports.if_else_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("if (a) debugger; else ;")));
    test.equal(result.type, "IfStatement");
    test.equal(result.test.name, 'a');
    test.equal(result.consequent.type, 'DebuggerStatement');
    test.equal(result.alternate.type, 'EmptyStatement');
    
    test.done();
};

exports.do_while_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("do debugger; while (a);")));
    test.equal(result.type, "DoWhileStatement");
    test.equal(result.test.name, 'a');
    test.equal(result.body.type, 'DebuggerStatement');
    
    test.done();
};

exports.do_while_while_body = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("do while (a) debugger; while (b);")));
    test.equal(result.type, "DoWhileStatement");
    test.equal(result.test.name, 'b');
    test.equal(result.body.type, 'WhileStatement');
    
    test.done();
};

exports.while_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("while (a) debugger;")));
    test.equal(result.type, "WhileStatement");
    test.equal(result.test.name, 'a');
    test.equal(result.body.type, 'DebuggerStatement');
    
    test.done();
};

exports.while_statement_do_while_body = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("while (a) do debugger; while (b);")));
    test.equal(result.type, "WhileStatement");
    test.equal(result.test.name, 'a');
    test.equal(result.body.type, 'DoWhileStatement');
    
    test.done();
};

exports.for_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("for (a; b; c) debugger;")));
    test.equal(result.type, "ForStatement");
    test.equal(result.init.name, 'a');
    test.equal(result.test.name, 'b');
    test.equal(result.update.name, 'c');
    test.equal(result.body.type, 'DebuggerStatement');
    
    test.done();
};

exports.for_statement_empty_init = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("for (; b; c) debugger;")));
    test.equal(result.type, "ForStatement");
    test.ok(!result.init);
    test.equal(result.test.name, 'b');
    test.equal(result.update.name, 'c');
    test.equal(result.body.type, 'DebuggerStatement');
    
    test.done();
};

exports.for_statement_empty_test = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("for (; ; c) debugger;")));
    test.equal(result.type, "ForStatement");
    test.ok(!result.init);
    test.ok(!result.test);
    test.equal(result.update.name, 'c');
    test.equal(result.body.type, 'DebuggerStatement');
    
    test.done();
};

exports.for_statement_empty_update = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("for (;;) debugger;")));
    test.equal(result.type, "ForStatement");
    test.ok(!result.init);
    test.ok(!result.test);
    test.ok(!result.update);
    test.equal(result.body.type, 'DebuggerStatement');
    
    test.done();
};

exports.for_statemenbt_var_init = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("for (var a = 3; b; c) debugger;")));
    test.equal(result.type, "ForStatement");
    test.equal(result.init.type, 'VariableDeclaration');
    test.equal(result.init.declarations[0].id.name, 'a');
    test.equal(result.init.declarations[0].init.value, 3);
    test.equal(result.test.name, 'b');
    test.equal(result.update.name, 'c');
    test.equal(result.body.type, 'DebuggerStatement');
    
    test.done();
};

exports.continue_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("continue;")));
    test.equal(result.type, "ContinueStatement");
    test.ok(!result.label);
    
    test.done();
};

exports.break_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("break;")));
    test.equal(result.type, "BreakStatement");
    test.ok(!result.label);
    
    test.done();
};

exports.return_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("return;")));
    test.equal(result.type, "ReturnStatement");
    test.ok(!result.argument);
    
    test.done();
};

exports.return_argument_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("return 3;")));
    test.equal(result.type, "ReturnStatement");
    test.equal(result.argument.value, 3);
    
    test.done();
};

exports.switch_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("switch (a) {}")));
    test.equal(result.type, "SwitchStatement");
    test.equal(result.discriminant.name, 'a');
    test.deepEqual(result.cases, []);
    
    test.done();
};

exports.switch_statement_with_cases = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("switch (a) { case x: break; case y: debugger; break; }")));
    test.equal(result.type, "SwitchStatement");
    test.equal(result.discriminant.name, 'a');
    test.equal(result.cases.length, 2);
    test.equal(result.cases[0].test.name, 'x');
    test.equal(result.cases[0].consequent[0].type, 'BreakStatement');
    test.equal(result.cases[1].test.name, 'y');
    test.equal(result.cases[1].consequent[0].type, 'DebuggerStatement');
    test.equal(result.cases[1].consequent[1].type, 'BreakStatement');
    
    test.done();
};

exports.switch_statement_with_default = function(test) {
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
    
    test.done();
};

exports.switch_statement_with_fallthrough = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("switch (a) { case x: case y: debugger; break; }")));
    test.equal(result.type, "SwitchStatement");
    test.equal(result.discriminant.name, 'a');
    test.equal(result.cases.length, 2);
    test.equal(result.cases[0].test.name, 'x');
    test.ok(!result.cases[0].consequent[0]);
    test.equal(result.cases[1].test.name, 'y');
    test.equal(result.cases[1].consequent[0].type, 'DebuggerStatement');
    test.equal(result.cases[1].consequent[1].type, 'BreakStatement');
    
    test.done();
};

exports.throw_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("throw a;")));
    test.equal(result.type, "ThrowStatement");
    test.equal(result.argument.name, 'a');
    
    test.done();
};

exports.try_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("try {debugger;}")));
    test.equal(result.type, "TryStatement");
    test.equal(result.block.body.length, 1);
    test.equal(result.block.body[0].type, "DebuggerStatement");
    
    test.done();
};

exports.try_finally_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("try {} finally { debugger; }")));
    test.equal(result.type, "TryStatement");
    test.equal(result.block.body.length, 0);
    test.equal(result.finalizer.body[0].type, "DebuggerStatement");
    
    test.done();
};

exports.try_catch_statement = function(test) {
    var stmt = testParser(parser.parserStream(lexer.lex("try {} catch (a) { debugger; }")));
    test.equal(stmt.type, "TryStatement");
    test.equal(stmt.block.body.length, 0);
    test.equal(stmt.handler.param.name, "a");
    test.equal(stmt.handler.body.body[0].type, "DebuggerStatement");
    
    test.done();
};

exports.try_catch_finally_statement = function(test) {
    var result = testParser(parser.parserStream(lexer.lex("try {} finally { debugger; }")));
    test.equal(result.type, "TryStatement");
    test.equal(result.block.body.length, 0);
    test.equal(result.finalizer.body[0].type, "DebuggerStatement");
    
    test.done();
};
