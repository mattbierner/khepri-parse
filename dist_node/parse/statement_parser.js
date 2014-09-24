/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/statement_parser.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("nu-stream")["stream"],
    __o0 = require("bennu")["parse"],
    __o1 = require("bennu")["lang"],
    ast_clause = require("khepri-ast")["clause"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_statement = require("khepri-ast")["statement"],
    __o2 = require("./common"),
    __o3 = require("./token_parser"),
    __o4 = require("./expression_parser"),
    __o5 = require("./pattern_parser"),
    __o6 = require("./value_parser"),
    blockStatement, staticStatement, variableStatement, emptyStatement, expressionStatement, ifStatement, withStatement,
        iterationStatement, continueStatement, breakStatement, returnStatement, switchStatement, throwStatement,
        tryStatement, debuggerStatement, statement, NIL = __o["NIL"],
    append = __o0["append"],
    choice = __o0["choice"],
    cons = __o0["cons"],
    eager = __o0["eager"],
    either = __o0["either"],
    enumeration = __o0["enumeration"],
    expected = __o0["expected"],
    many = __o0["many"],
    next = __o0["next"],
    optional = __o0["optional"],
    label = __o0["label"],
    late = __o0["late"],
    between = __o1["between"],
    sepBy1 = __o1["sepBy1"],
    then = __o1["then"],
    node = __o2["node"],
    nodea = __o2["nodea"],
    keyword = __o3["keyword"],
    punctuator = __o3["punctuator"],
    expression = __o4["expression"],
    topLevelExpression = __o4["topLevelExpression"],
    importPattern = __o5["importPattern"],
    topLevelPattern = __o5["topLevelPattern"],
    identifier = __o6["identifier"],
    operator = __o6["operator"],
    y, y5, declaratorId, initializer, variableDeclaration, x8, condition, y15, x9, condition0, y16, x10,
        forInitExpression, y17;
(statement = late((function() {
    return statement;
})));
var logicalSemiColon = punctuator(";"),
    statementList = ((y = many(statement)), eager(y)),
    x = label.bind(null, "Block Statement"),
    y0 = node(between(punctuator("{"), punctuator("}"), statementList), ast_statement.BlockStatement.create);
(blockStatement = x(y0));
var x0 = label.bind(null, "Empty Statement"),
    y1 = node(logicalSemiColon, ast_statement.EmptyStatement.create);
(emptyStatement = x0(y1));
var x1 = label.bind(null, "Debugger Statement"),
    y2 = node(next(keyword("debugger"), logicalSemiColon), ast_statement.DebuggerStatement.create);
(debuggerStatement = x1(y2));
var x2 = label.bind(null, "Expression Statement"),
    y3 = node(then(topLevelExpression, logicalSemiColon), ast_statement.ExpressionStatement.create);
(expressionStatement = x2(y3));
var x3 = label.bind(null, "Static Statement"),
    staticDeclaration = node(identifier, ast_declaration.StaticDeclarator.create),
    staticDeclarationList = eager(sepBy1(punctuator(","), staticDeclaration)),
    y4 = node(between(keyword("static"), logicalSemiColon, staticDeclarationList), ast_declaration.StaticDeclaration.create);
(staticStatement = x3(y4));
var variableDeclarationList = ((declaratorId = either(identifier, operator)), (initializer = enumeration(punctuator("=",
    ":=", "=:"), ((y5 = expected.bind(null, "variable initilizer")), y5(expression)))), (variableDeclaration =
    nodea(cons(declaratorId, optional(NIL, initializer)), (function(loc, id, op, init) {
        return ast_declaration.VariableDeclarator.create(loc, id, init, (op && ((op.value === ":=") || (op.value ===
            "=:"))), (!(op && (op.value === "=:"))));
    }))), eager(sepBy1(punctuator(","), variableDeclaration))),
    x4 = label.bind(null, "Variable Statement"),
    y6 = node(between(keyword("var"), logicalSemiColon, variableDeclarationList), ast_declaration.VariableDeclaration.create);
(variableStatement = x4(y6));
var y9, x5 = label.bind(null, "With Statement"),
    y7 = expected.bind(null, "pattern"),
    withIdentifier = y7(topLevelPattern),
    withBinding = either(importPattern, nodea(enumeration(withIdentifier, punctuator("=", "=:", ":="), expression), (
        function(loc, pattern, rec, value) {
            return ast_declaration.Binding.create(loc, pattern, value, (rec.value === ":="));
        }))),
    bindings = eager(sepBy1(punctuator(","), withBinding)),
    y8 = nodea(enumeration(between(keyword("with"), keyword("in"), ((y9 = expected.bind(null, "with bindings")), y9(
        bindings))), blockStatement), ast_statement.WithStatement.create);
(withStatement = x5(y8));
var y10, x6 = label.bind(null, "If Statement"),
    test = between(punctuator("("), punctuator(")"), ((y10 = expected.bind(null, "if condition")), y10(expression))),
    alternate = next(keyword("else"), statement),
    y11 = nodea(next(keyword("if"), enumeration(test, statement, optional(alternate))), ast_statement.IfStatement.create);
(ifStatement = x6(y11));
var y12, y14, x7 = label.bind(null, "Switch Statement"),
    caseClause = nodea(enumeration(between(keyword("case"), punctuator(":"), ((y12 = expected.bind(null, "case test")),
        y12(expression))), statementList), ast_clause.SwitchCase.create),
    defaultClause = node(next(keyword("default"), next(punctuator(":"), statementList)), (function(loc, consequent) {
        return ast_clause.SwitchCase.create(loc, null, consequent);
    })),
    caseClauses = many(caseClause),
    caseBlock = eager(between(punctuator("{"), punctuator("}"), append(optional(NIL, caseClauses), optional(NIL,
        enumeration(defaultClause))))),
    y13 = nodea(next(keyword("switch"), enumeration(between(punctuator("("), punctuator(")"), ((y14 = expected.bind(
        null, "switch discriminant")), y14(expression))), caseBlock)), ast_statement.SwitchStatement.create);
(switchStatement = x7(y13));
var whileStatement = ((x8 = label.bind(null, "While Statement")), (condition = between(punctuator("("), punctuator(")"),
    expression)), (y15 = nodea(next(keyword("while"), enumeration(condition, statement)), ast_statement.WhileStatement
    .create)), x8(y15)),
    doWhileStatement = ((x9 = label.bind(null, "Do While Statement")), (condition0 = between(punctuator("("),
        punctuator(")"), expression)), (y16 = nodea(next(keyword("do"), enumeration(blockStatement, between(keyword(
        "while"), logicalSemiColon, condition0))), ast_statement.DoWhileStatement.create)), x9(y16)),
    forStatement = ((x10 = label.bind(null, "For Statement")), (forInitExpression = either(node(next(keyword("var"),
        variableDeclarationList), ast_declaration.VariableDeclaration.create), topLevelExpression)), (y17 = nodea(
        next(keyword("for"), enumeration(next(punctuator("("), optional(forInitExpression)), next(
                logicalSemiColon, optional(expression)), next(logicalSemiColon, optional(topLevelExpression)),
            next(punctuator(")"), statement))), ast_statement.ForStatement.create)), x10(y17)),
    x11 = label.bind(null, "Iteration Statement"),
    y18 = choice(doWhileStatement, whileStatement, forStatement);
(iterationStatement = x11(y18));
var x12 = label.bind(null, "Continue Statement"),
    y19 = node(next(keyword("continue"), logicalSemiColon), ast_statement.ContinueStatement.create);
(continueStatement = x12(y19));
var x13 = label.bind(null, "Break Statement"),
    y20 = node(next(keyword("break"), logicalSemiColon), ast_statement.BreakStatement.create);
(breakStatement = x13(y20));
var x14 = label.bind(null, "Return Statement"),
    y21 = node(between(keyword("return"), logicalSemiColon, optional(expression)), ast_statement.ReturnStatement.create);
(returnStatement = x14(y21));
var x15 = label.bind(null, "Throw Statement"),
    y22 = node(between(keyword("throw"), logicalSemiColon, expression), ast_statement.ThrowStatement.create);
(throwStatement = x15(y22));
var x16 = label.bind(null, "Try Statement"),
    catchBlock = nodea(next(keyword("catch"), enumeration(between(punctuator("("), punctuator(")"), identifier),
        blockStatement)), ast_clause.CatchClause.create),
    finallyBlock = next(keyword("finally"), blockStatement),
    y23 = nodea(next(keyword("try"), enumeration(blockStatement, optional(catchBlock), optional(finallyBlock))),
        ast_statement.TryStatement.create);
(tryStatement = x16(y23));
var x17 = label.bind(null, "Statement"),
    y24 = choice(blockStatement, staticStatement, variableStatement, emptyStatement, ifStatement, withStatement,
        iterationStatement, continueStatement, breakStatement, returnStatement, switchStatement, throwStatement,
        tryStatement, debuggerStatement, expressionStatement),
    x18 = x17(y24),
    y25 = expected.bind(null, "statement");
(statement = y25(x18));
(exports["blockStatement"] = blockStatement);
(exports["staticStatement"] = staticStatement);
(exports["variableStatement"] = variableStatement);
(exports["emptyStatement"] = emptyStatement);
(exports["expressionStatement"] = expressionStatement);
(exports["ifStatement"] = ifStatement);
(exports["withStatement"] = withStatement);
(exports["iterationStatement"] = iterationStatement);
(exports["continueStatement"] = continueStatement);
(exports["breakStatement"] = breakStatement);
(exports["returnStatement"] = returnStatement);
(exports["switchStatement"] = switchStatement);
(exports["throwStatement"] = throwStatement);
(exports["tryStatement"] = tryStatement);
(exports["debuggerStatement"] = debuggerStatement);
(exports["statement"] = statement);