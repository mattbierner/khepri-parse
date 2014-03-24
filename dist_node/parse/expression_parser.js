/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/expression_parser.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("bennu")["parse"],
    always = __o["always"],
    append = __o["append"],
    attempt = __o["attempt"],
    bind = __o["bind"],
    binds = __o["binds"],
    choice = __o["choice"],
    eager = __o["eager"],
    either = __o["either"],
    enumeration = __o["enumeration"],
    expected = __o["expected"],
    many = __o["many"],
    memo = __o["memo"],
    next = __o["next"],
    optional = __o["optional"],
    rec = __o["rec"],
    late = __o["late"],
    label = __o["label"],
    __o0 = require("bennu")["lang"],
    between = __o0["between"],
    chainl1 = __o0["chainl1"],
    sepBy = __o0["sepBy"],
    sepBy1 = __o0["sepBy1"],
    then = __o0["then"],
    __o1 = require("nu-stream")["stream"],
    foldl = __o1["foldl"],
    foldr = __o1["foldr"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_expression = require("khepri-ast")["expression"],
    ast_statement = require("khepri-ast")["statement"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    __o2 = require("khepri-ast")["position"],
    SourceLocation = __o2["SourceLocation"],
    __o3 = require("./common"),
    node = __o3["node"],
    nodea = __o3["nodea"],
    precedence = __o3["precedence"],
    __o4 = require("./token_parser"),
    keyword = __o4["keyword"],
    punctuator = __o4["punctuator"],
    program_parser = require("./program_parser"),
    __o5 = require("./value_parser"),
    identifier = __o5["identifier"],
    literal = __o5["literal"],
    stringLiteral = __o5["stringLiteral"],
    pattern = require("./pattern_parser"),
    arrayLiteral, objectLiteral, functionExpression, operatorExpression, letExpression, primaryExpression, accessor,
        memberExpression, newExpression, curryExpression, applicationExpression, unaryOperator, unaryExpression,
        binaryExpression, conditionalExpression, leftHandReferenceExpression, assignmentExpression, expression,
        topLevelExpression, arg, arrayElement, arrayElements, propertyName, propertyInitializer, objectProperties,
        functionName, functionBody, letBindings, letBody, op, reducer, reducer0, reducer1, blockStatement = late((
            function() {
                var __o = require("./statement_parser"),
                    blockStatement = __o["blockStatement"];
                return blockStatement;
            }));
(expression = late((function() {
    return expression;
})));
(memberExpression = late((function() {
    return memberExpression;
})));
(curryExpression = late((function() {
    return memberExpression;
})));
var args = label("Arguments", ((arg = expression), node(between(punctuator("("), punctuator(")"), eager(sepBy(
    punctuator(","), expected("argument", arg)))), (function(loc, x) {
    (x.loc = loc);
    return x;
}))));
(arrayLiteral = label("Array Literal", ((arrayElement = expression), (arrayElements = sepBy(punctuator(","), expected(
    "array element", arrayElement))), node(between(punctuator("["), punctuator("]"), eager(arrayElements)),
    ast_expression.ArrayExpression.create))));
(objectLiteral = label("Object Literal", ((propertyName = stringLiteral), (propertyInitializer = label(
    "Property Initializer", nodea(enumeration(then(propertyName, punctuator(":")), expression),
        ast_value.ObjectValue.create))), (objectProperties = sepBy(punctuator(","), expected(
    "object property", propertyInitializer))), node(between(punctuator("{"), punctuator("}"), eager(
    objectProperties)), ast_expression.ObjectExpression.create))));
(functionExpression = label("Function Expression", ((functionName = optional(null, next(keyword("function"), optional(
    null, identifier)))), (functionBody = either(blockStatement, expression)), nodea(enumeration(
    functionName, next(punctuator("\\"), pattern.argumentsPattern), next(punctuator("->"), expected(
        "function body", functionBody))), ast_expression.FunctionExpression.create))));
var letBinding = label("Let Binding", nodea(enumeration(expected("pattern", pattern.topLevelPattern), punctuator("=",
    "=:", ":="), expected("bound value", expression)), (function(loc, pattern, rec, expr) {
    return ast_declaration.Binding.create(loc, pattern, expr, (rec.value === ":="));
})));
(letExpression = label("Let Expression", ((letBindings = sepBy1(punctuator(","), letBinding)), (letBody = expression),
    nodea(next(keyword("let"), enumeration(expected("let bindings", eager(letBindings)), next(keyword("in"),
        expected("let body expression", letBody)))), ast_expression.LetExpression.create))));
(conditionalExpression = label("Conditional Expression", nodea(next(punctuator("?"), enumeration(expression, next(
        punctuator(":"), expected("conditional consequent expression", expression)), next(punctuator(
        ":"), expected("conditional alternate expression", expression)))), ast_expression.ConditionalExpression
    .create)));
var unaryOperatorExpression = label("Unary Operator Expression", bind(either(keyword("typeof"), punctuator("void", "~",
    "!", "++", "--")), (function(__o) {
    var loc = __o["loc"],
        value = __o["value"];
    return always(ast_expression.UnaryOperatorExpression.create(loc, value));
}))),
    binaryOperatorExpression = label("Binary Operator Expression", nodea(enumeration(optional(false, keyword("_")),
        either(keyword("instanceof", "new"), punctuator(".", "*", "/", "+", "-", "%", "<<", ">>", ">>>", "<",
            ">", "<=", ">=", "==", "!=", "===", "!==", "&", "^", "|", "||", "&&", "|>", "\\>", "\\>>", "<|",
            "<\\", "<<\\", "@"))), (function(loc, flipped, op) {
        return ast_expression.BinaryOperatorExpression.create(loc, op.value, (!(!flipped)));
    }))),
    ternayOperatorExpression = label("Ternary Operator Expression", bind(punctuator("?"), (function(__o) {
        var loc = __o["loc"],
            value = __o["value"];
        return always(ast_expression.TernaryOperatorExpression.create(loc, value));
    })));
(operatorExpression = label("Operator Expression", ((op = choice(unaryOperatorExpression, binaryOperatorExpression,
    ternayOperatorExpression)), nodea(between(punctuator("("), punctuator(")"), enumeration(op, optional(
    null, next(punctuator(","), eager(sepBy1(punctuator(","), expected("argument", expression))))
))), (function(loc, target, args) {
    return (args ? ast_expression.CurryExpression.create(loc, target, args) : target);
})))));
(primaryExpression = label("Primary Expression", choice(letExpression, conditionalExpression, identifier, literal,
    arrayLiteral, objectLiteral, functionExpression, attempt(operatorExpression), between(punctuator("("),
        punctuator(")"), expected("expression", expression)))));
var argumentList = label("Argument List", either(attempt(node(operatorExpression, (function(loc, x) {
    var a = [x];
    (a.loc = loc);
    return a;
}))), args));
(accessor = label("Accessor", node(next(punctuator("."), either(identifier.map((function(x) {
        return [x, false];
    })), between(punctuator("("), punctuator(")"), expected("accessor expression", expression))
    .map((function(x) {
        return [x, true];
    })))), (function(loc, __o) {
    var x = __o[0],
        computed = __o[1];
    return ({
        "loc": loc,
        "property": x,
        "computed": computed
    });
}))));
(newExpression = label("New Expression", nodea(next(keyword("new"), enumeration(expected("member expression",
        memberExpression), expected("argument list", either(args, eager(enumeration(curryExpression)))))),
    ast_expression.NewExpression.create)));
var accessorReducer = (function(p, c) {
    return ast_expression.MemberExpression.create(SourceLocation.merge(p.loc, c.loc), p, c.property, c.computed);
});
(memberExpression = label("Member Expression", binds(enumeration(either(primaryExpression, newExpression), many(memo(
    accessor))), (function(f, g) {
    return (function() {
        return f(g.apply(null, arguments));
    });
})(always, foldl.bind(null, accessorReducer)))));
var leftHandSideExpression = label("Call Expression", ((reducer = (function(p, c) {
    return (c.hasOwnProperty("property") ? ast_expression.MemberExpression.create(SourceLocation.merge(
        p.loc, c.loc), p, c.property, c.computed) : ast_expression.CallExpression.create(
        SourceLocation.merge(p.loc, c.loc), p, c));
})), binds(enumeration(memberExpression, many(either(argumentList, accessor))), (function(f, g) {
    return (function() {
        return f(g.apply(null, arguments));
    });
})(always, foldl.bind(null, reducer)))));
(curryExpression = label("Curry Expression", ((reducer0 = (function(f, args) {
    return ast_expression.CurryExpression.create(SourceLocation.merge(f.loc, args.loc), f, [].concat(
        args));
})), binds(enumeration(leftHandSideExpression, many(next(punctuator("@"), expected("curry argument", either(
    argumentList, leftHandSideExpression))))), (function(f, g) {
    return (function() {
        return f(g.apply(null, arguments));
    });
})(always, foldl.bind(null, reducer0))))));
(applicationExpression = label("Call Expression", chainl1(always((function(p, c) {
    return ast_expression.CallExpression.create(SourceLocation.merge(p.loc, c.loc), p, [c]);
})), curryExpression)));
(unaryOperator = label("Unary Operator", either(keyword("typeof", "void"), punctuator("++", "--", "~", "!"))));
(unaryExpression = label("Unary Expression", ((reducer1 = (function(argument, op) {
    return ast_expression.UnaryExpression.create(SourceLocation.merge(op.loc, argument.loc), op.value,
        argument);
})), binds(enumeration(many(unaryOperator), expected("unary argument", applicationExpression)), (function(
    ops, expression) {
    return always(foldr(reducer1, expression, ops));
})))));
var precedenceTable = [({
    "sep": punctuator("*", "/", "%"),
    "precedence": 1,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("+", "-"),
    "precedence": 2,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("<<", ">>", ">>>"),
    "precedence": 3,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": either(punctuator("<", ">", "<=", ">="), keyword("instanceof")),
    "precedence": 4,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("==", "!=", "===", "!=="),
    "precedence": 5,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("&"),
    "precedence": 6,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("^"),
    "precedence": 7,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("|"),
    "precedence": 8,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("\\>", "\\>>"),
    "precedence": 9,
    "right": true,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("<\\", "<<\\"),
    "precedence": 9,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("|>"),
    "precedence": 10,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("<|"),
    "precedence": 10,
    "right": true,
    "node": ast_expression.BinaryExpression
}), ({
    "sep": punctuator("||"),
    "precedence": 11,
    "node": ast_expression.LogicalExpression
}), ({
    "sep": punctuator("&&"),
    "precedence": 12,
    "node": ast_expression.LogicalExpression
})];
(binaryExpression = label("Binary Expression", precedence(memo(unaryExpression), precedenceTable)));
(expression = binaryExpression);
(leftHandReferenceExpression = label("Left Hand Reference Expression", binds(enumeration(identifier, many(memo(accessor))), (
    function(f, g) {
        return (function() {
            return f(g.apply(null, arguments));
        });
    })(always, foldl.bind(null, accessorReducer)))));
(assignmentExpression = label("Assignment Expression", rec((function(self) {
    return nodea(append(attempt(enumeration(leftHandReferenceExpression, punctuator("="))), enumeration(
        expected("expression", either(self, expression)))), (function(loc, left, op, right) {
        return ast_expression.AssignmentExpression.create(loc, "=", left, right);
    }));
}))));
var deleteExpression = label("Delete Expression", node(next(keyword("delete"), expected("reference expression",
    leftHandReferenceExpression)), (function(loc, expression) {
    return ast_expression.UnaryExpression.create(loc, "delete", expression);
})));
(topLevelExpression = choice(deleteExpression, assignmentExpression, expression));
(exports["arrayLiteral"] = arrayLiteral);
(exports["objectLiteral"] = objectLiteral);
(exports["functionExpression"] = functionExpression);
(exports["operatorExpression"] = operatorExpression);
(exports["letExpression"] = letExpression);
(exports["primaryExpression"] = primaryExpression);
(exports["accessor"] = accessor);
(exports["memberExpression"] = memberExpression);
(exports["newExpression"] = newExpression);
(exports["curryExpression"] = curryExpression);
(exports["applicationExpression"] = applicationExpression);
(exports["unaryOperator"] = unaryOperator);
(exports["unaryExpression"] = unaryExpression);
(exports["binaryExpression"] = binaryExpression);
(exports["conditionalExpression"] = conditionalExpression);
(exports["leftHandReferenceExpression"] = leftHandReferenceExpression);
(exports["assignmentExpression"] = assignmentExpression);
(exports["expression"] = expression);
(exports["topLevelExpression"] = topLevelExpression);