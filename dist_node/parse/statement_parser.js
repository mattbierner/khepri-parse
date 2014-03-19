/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/statement_parser.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("nu-stream")["stream"],
    NIL = __o["NIL"],
    __o0 = require("bennu")["parse"],
    always = __o0["always"],
    attempt = __o0["attempt"],
    binds = __o0["binds"],
    choice = __o0["choice"],
    cons = __o0["cons"],
    eager = __o0["eager"],
    either = __o0["either"],
    enumeration = __o0["enumeration"],
    expected = __o0["expected"],
    lookahead = __o0["lookahead"],
    many = __o0["many"],
    next = __o0["next"],
    optional = __o0["optional"],
    label = __o0["label"],
    late = __o0["late"],
    __o1 = require("bennu")["lang"],
    between = __o1["between"],
    sepBy1 = __o1["sepBy1"],
    then = __o1["then"],
    ast_clause = require("khepri-ast")["clause"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_statement = require("khepri-ast")["statement"],
    __o2 = require("./common"),
    node = __o2["node"],
    nodea = __o2["nodea"],
    __o3 = require("./token_parser"),
    keyword = __o3["keyword"],
    punctuator = __o3["punctuator"],
    __o4 = require("./expression_parser"),
    expression = __o4["expression"],
    topLevelExpression = __o4["topLevelExpression"],
    __o5 = require("./pattern_parser"),
    importPattern = __o5["importPattern"],
    pattern = __o5["pattern"],
    __o6 = require("./value_parser"),
    identifier = __o6["identifier"],
    blockStatement, staticStatement, variableStatement, emptyStatement, expressionStatement, ifStatement, withStatement,
        iterationStatement, continueStatement, breakStatement, returnStatement, switchStatement, throwStatement,
        tryStatement, debuggerStatement, statement, staticDeclaration, staticDeclarationList, initialiser,
        variableDeclaration, withIdentifier, withBinding, bindings, caseClause, defaultClause, caseClauses, caseBlock,
        forInitExpression, forTestExpression, forUpdateExpression, catchBlock, finallyBlock;
(statement = late((function() {
    return statement;
})));
var logicalSemiColon = punctuator(";"),
    statementList = eager(many(statement));
(blockStatement = label("Block Statement", node(between(punctuator("{"), punctuator("}"), statementList), ast_statement
    .BlockStatement.create)));
(emptyStatement = label("Empty Statement", node(logicalSemiColon, ast_statement.EmptyStatement.create)));
(debuggerStatement = label("Debugger Statement", node(next(keyword("debugger"), punctuator(";")), ast_statement.DebuggerStatement
    .create)));
(expressionStatement = label("Expression Statement", node(then(topLevelExpression, logicalSemiColon), ast_statement.ExpressionStatement
    .create)));
(staticStatement = label("Static Statement", ((staticDeclaration = node(identifier, ast_declaration.StaticDeclarator.create)), (
    staticDeclarationList = eager(sepBy1(punctuator(","), staticDeclaration))), node(between(keyword(
    "static"), logicalSemiColon, staticDeclarationList), ast_declaration.StaticDeclaration.create))));
var variableDeclarationList = ((initialiser = enumeration(punctuator("=", ":=", "=:"), expected("variable initilizer",
    expression))), (variableDeclaration = nodea(cons(identifier, optional(NIL, initialiser)), (function(loc, id, op,
    init) {
    return ast_declaration.VariableDeclarator.create(loc, id, init, (op && ((op.value === ":=") || (op.value ===
        "=:"))), (!(op && (op.value === "=:"))));
}))), eager(sepBy1(punctuator(","), variableDeclaration)));
(variableStatement = label("Variable Statement", node(between(keyword("var"), logicalSemiColon, variableDeclarationList),
    ast_declaration.VariableDeclaration.create)));
(withStatement = label("With Statement", ((withIdentifier = expected("pattern", pattern)), (withBinding = either(
    importPattern, nodea(enumeration(withIdentifier, punctuator("=", "=:", ":="), expression), (
        function(loc, pattern, rec, value) {
            return ast_declaration.Binding.create(loc, pattern, value, (rec.value === ":="));
        })))), (bindings = eager(sepBy1(punctuator(","), withBinding))), nodea(next(keyword("with"),
    enumeration(bindings, next(keyword("in"), statement))), ast_statement.WithStatement.create))));
(ifStatement = label("If Statement", nodea(next(keyword("if"), enumeration(between(punctuator("("), punctuator(")"),
    expected("if condition", expression)), statement, optional(null, next(keyword("else"),
    statement)))), ast_statement.IfStatement.create)));
(switchStatement = label("Switch Statement", ((caseClause = nodea(next(keyword("case"), enumeration(then(expression,
    punctuator(":")), statementList)), ast_clause.SwitchCase.create)), (defaultClause = node(next(keyword(
    "default"), next(punctuator(":"), statementList)), (function(loc, consequent) {
    return ast_clause.SwitchCase.create(loc, null, consequent);
}))), (caseClauses = eager(many(caseClause))), (caseBlock = between(punctuator("{"), punctuator("}"), binds(
    enumeration(optional([], caseClauses), optional(null, defaultClause)), (function(first,
        defaultClause) {
        return always((defaultClause ? first.concat(defaultClause) : first));
    })))), nodea(next(keyword("switch"), enumeration(between(punctuator("("), punctuator(")"), expected(
    "switch discriminant", expression)), caseBlock)), ast_statement.SwitchStatement.create))));
var whileStatement = label("While Statement", nodea(next(keyword("while"), enumeration(between(punctuator("("),
    punctuator(")"), expression), statement)), ast_statement.WhileStatement.create)),
    doWhileStatement = label("Do While Statement", next(attempt(lookahead(next(keyword("do"), punctuator("{")))), nodea(
        next(keyword("do"), enumeration(blockStatement, next(keyword("while"), between(punctuator("("),
            punctuator(")"), expression)), punctuator(";"))), ast_statement.DoWhileStatement.create))),
    forStatement = label("For Statement", ((forInitExpression = optional(null, either(node(next(keyword("var"),
        variableDeclarationList), ast_declaration.VariableDeclaration.create), topLevelExpression))), (
        forTestExpression = optional(null, expression)), (forUpdateExpression = optional(null,
        topLevelExpression)), nodea(next(keyword("for"), enumeration(next(punctuator("("), forInitExpression),
        next(punctuator(";"), forTestExpression), next(punctuator(";"), forUpdateExpression), next(
            punctuator(")"), statement))), ast_statement.ForStatement.create)));
(iterationStatement = label("Iteration Statement", choice(doWhileStatement, whileStatement, forStatement)));
(continueStatement = label("Continue Statement", node(next(keyword("continue"), logicalSemiColon), ast_statement.ContinueStatement
    .create)));
(breakStatement = label("Break Statement", node(next(keyword("break"), logicalSemiColon), ast_statement.BreakStatement.create)));
(returnStatement = label("Return Statement", node(between(keyword("return"), logicalSemiColon, optional(null,
    expression)), ast_statement.ReturnStatement.create)));
(throwStatement = label("Throw Statement", node(between(keyword("throw"), logicalSemiColon, expression), ast_statement.ThrowStatement
    .create)));
(tryStatement = label("Try Statement", ((catchBlock = nodea(next(keyword("catch"), enumeration(between(punctuator("("),
    punctuator(")"), identifier), blockStatement)), ast_clause.CatchClause.create)), (finallyBlock = next(
    keyword("finally"), blockStatement)), nodea(next(keyword("try"), enumeration(blockStatement, optional(
    null, catchBlock), optional(null, finallyBlock))), ast_statement.TryStatement.create))));
(statement = expected("statement", label("Statement", choice(blockStatement, staticStatement, variableStatement,
    emptyStatement, ifStatement, withStatement, iterationStatement, continueStatement, breakStatement,
    returnStatement, switchStatement, throwStatement, tryStatement, debuggerStatement, expressionStatement))));
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