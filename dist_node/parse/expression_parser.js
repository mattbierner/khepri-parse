/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/expression_parser.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("bennu")["lang"],
    __o1 = require("nu-stream")["stream"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_expression = require("khepri-ast")["expression"],
    ast_value = require("khepri-ast")["value"],
    __o2 = require("khepri-ast")["position"],
    __o3 = require("./common"),
    tokenParser = require("./token_parser"),
    value = require("./value_parser"),
    __o4 = require("./pattern_parser"),
    _ = require("./function_parser"),
    arrayLiteral, objectLiteral, operatorExpression, letExpression, primaryExpression, accessor, memberExpression,
        newExpression, curryExpression, applicationExpression, unaryOperator, unaryExpression, binaryExpression,
        conditionalExpression, leftHandReferenceExpression, assignmentExpression, expression, topLevelExpression,
        always = __o["always"],
    append = __o["append"],
    attempt = __o["attempt"],
    bind = __o["bind"],
    binds = __o["binds"],
    choice = __o["choice"],
    cons = __o["cons"],
    eager = __o["eager"],
    either = __o["either"],
    enumeration = __o["enumeration"],
    expected = __o["expected"],
    many = __o["many"],
    many1 = __o["many1"],
    memo = __o["memo"],
    next = __o["next"],
    optional = __o["optional"],
    rec = __o["rec"],
    late = __o["late"],
    label = __o["label"],
    between = __o0["between"],
    chainl1 = __o0["chainl1"],
    sepBy = __o0["sepBy"],
    sepBy1 = __o0["sepBy1"],
    then = __o0["then"],
    foldl = __o1["foldl"],
    foldr = __o1["foldr"],
    SourceLocation = __o2["SourceLocation"],
    node = __o3["node"],
    nodea = __o3["nodea"],
    precedence = __o3["precedence"],
    keyword = tokenParser["keyword"],
    punctuator = tokenParser["punctuator"],
    prefixedOp = tokenParser["prefixedOp"],
    identifier = value["identifier"],
    literal = value["literal"],
    operator = value["operator"],
    stringLiteral = value["stringLiteral"],
    numericLiteral = value["numericLiteral"],
    topLevelPattern = __o4["topLevelPattern"],
    y1, y0, x, arg, y, y8, x4, y9, x3, y7, x10, y16, reducer, y17, x11, x12, y18, x13, y19, x14, y20, x18, y24, y33,
        x26, x25, reducer0, y32, y44, x37, x36, y43, y47, x39, y46, functionExpression = late((function() {
            var __o5 = require("./function_parser"),
                functionExpression0 = __o5["functionExpression"];
            return functionExpression0;
        }));
(expression = late((function() {
    return expression;
})));
(memberExpression = late((function() {
    return memberExpression;
})));
(operatorExpression = late((function() {
    return operatorExpression;
})));
(accessor = late((function() {
    return accessor;
})));
(curryExpression = late((function() {
    return curryExpression;
})));
var args = ((x = label.bind(null, "Arguments")), (arg = expression), (y = node(between(punctuator("("), punctuator(")"), (
    (y0 = sepBy(punctuator(","), ((y1 = expected.bind(null, "argument")), y1(arg)))), eager(y0))), (
    function(loc, x0) {
        (x0.loc = loc);
        return x0;
    }))), x(y)),
    y2, x0 = label.bind(null, "Array Literal"),
    arrayElement = expression,
    arrayElements = sepBy(punctuator(","), ((y2 = expected.bind(null, "array element")), y2(arrayElement))),
    y3 = node(between(punctuator("["), punctuator("]"), eager(arrayElements)), ast_expression.ArrayExpression.create);
(arrayLiteral = x0(y3));
var y5, x1 = label.bind(null, "Object Literal"),
    propertyName = choice(stringLiteral, numericLiteral, identifier),
    x2 = label.bind(null, "Property Initializer"),
    y4 = nodea(enumeration(then(propertyName, punctuator(":")), expression), ast_value.ObjectValue.create),
    propertyInitializer = x2(y4),
    objectProperties = sepBy(punctuator(","), ((y5 = expected.bind(null, "object property")), y5(propertyInitializer))),
    y6 = node(between(punctuator("{"), punctuator("}"), eager(objectProperties)), ast_expression.ObjectExpression.create);
(objectLiteral = x1(y6));
var letBinding = ((x3 = label.bind(null, "Let Binding")), (y7 = nodea(enumeration(((y8 = expected.bind(null, "pattern")),
    y8(topLevelPattern)), punctuator("=", "=:", ":="), ((x4 = expression), (y9 = expected.bind(null,
    "bound value")), y9(x4))), (function(loc, pattern, rec0, expr) {
    return ast_declaration.Binding.create(loc, pattern, expr, (rec0.value === ":="));
}))), x3(y7)),
    x6, y11, y12, x5 = label.bind(null, "Let Expression"),
    letBindings = sepBy1(punctuator(","), letBinding),
    letBody = expression,
    y10 = nodea(next(keyword("let"), enumeration(((x6 = eager(letBindings)), (y11 = expected.bind(null, "let bindings")),
            y11(x6)), next(keyword("in"), ((y12 = expected.bind(null, "let body expression")), y12(letBody))))),
        ast_expression.LetExpression.create);
(letExpression = x5(y10));
var x8, y14, x9, y15, x7 = label.bind(null, "Conditional Expression"),
    y13 = nodea(next(punctuator("?"), enumeration(expression, next(punctuator(":"), ((x8 = expression), (y14 = expected
            .bind(null, "conditional consequent expression")), y14(x8))), next(punctuator(":"), ((x9 =
            expression), (y15 = expected.bind(null, "conditional alternate expression")), y15(x9))))), ast_expression.ConditionalExpression
        .create);
(conditionalExpression = x7(y13));
var argumentList = ((x10 = label.bind(null, "Argument List")), (y16 = either(attempt(node(operatorExpression, (function(
    loc, x11) {
    var a = [x11];
    (a.loc = loc);
    return a;
}))), args)), x10(y16)),
    dotExpression = ((reducer = (function(p, c) {
        return (c.hasOwnProperty("property") ? ast_expression.MemberExpression.create((p ? SourceLocation.merge(
            p.loc, c.loc) : c.loc), p, c.property, c.computed) : ast_expression.CallExpression.create((
            p ? SourceLocation.merge(p.loc, c.loc) : c.loc), p, c));
    })), bind(cons(accessor, ((y17 = either(argumentList, accessor)), many(y17))), ((x11 = foldl.bind(null, reducer,
        null)), (function(z) {
        return always(x11(z));
    })))),
    unaryOperatorExpression = ((x12 = label.bind(null, "Unary Operator Expression")), (y18 = choice(value.unaryOperator,
            keyword("typeof", "void")
            .map((function(__o5) {
                var loc = __o5["loc"],
                    value0 = __o5["value"];
                return ast_value.UnaryOperator.create(loc, value0);
            })), attempt(dotExpression))
        .map((function(op) {
            return ast_expression.OperatorExpression.create(op.loc, op);
        }))), x12(y18)),
    binaryOperatorExpression = ((x13 = label.bind(null, "Binary Operator Expression")), (y19 = nodea(cons(optional(
        keyword("_")), either(enumeration(either(keyword("new"), punctuator(".")), optional(next(
        punctuator(","), expression))), enumeration(choice(keyword("instanceof"), punctuator("@"),
        tokenParser.binaryOperator), optional(next(optional(punctuator(",")), expression))))), (function(
        loc, flipped, op, arg0) {
        var operator0 = ast_expression.OperatorExpression.create(loc, ast_value.BinaryOperator.create(
            loc, op.value), flipped);
        return (arg0 ? ast_expression.CurryExpression.create(loc, operator0, [arg0]) : operator0);
    }))), x13(y19)),
    ternayOperatorExpression = ((x14 = label.bind(null, "Ternary Operator Expression")), (y20 = punctuator("?")
        .map((function(__o5) {
            var loc = __o5["loc"],
                value0 = __o5["value"];
            return ast_expression.OperatorExpression.create(loc, ast_value.TernaryOperator.create(loc,
                value0));
        }))), x14(y20)),
    x15 = label.bind(null, "Operator Expression"),
    y21 = between(punctuator("("), punctuator(")"), choice(unaryOperatorExpression, binaryOperatorExpression,
        ternayOperatorExpression));
(operatorExpression = x15(y21));
var x17, y23, x16 = label.bind(null, "Primary Expression"),
    y22 = choice(letExpression, conditionalExpression, identifier, literal, arrayLiteral, objectLiteral,
        functionExpression, attempt(operatorExpression), dotExpression.map((function(expr) {
            return ast_expression.OperatorExpression.create(expr.loc, expr);
        })), between(punctuator("("), punctuator(")"), ((x17 = expression), (y23 = expected.bind(null, "expression")),
            y23(x17))));
(primaryExpression = x16(y22));
var accessorTarget = either(identifier.map((function(x18) {
        return [x18, false];
    })), between(punctuator("("), punctuator(")"), ((x18 = expression), (y24 = expected.bind(null,
        "accessor expression")), y24(x18)))
    .map((function(x19) {
        return [x19, true];
    }))),
    x19 = label.bind(null, "Accessor"),
    y25 = node(next(punctuator("."), accessorTarget), (function(loc, __o5) {
        var x20 = __o5[0],
            computed = __o5[1];
        return ({
            "loc": loc,
            "property": x20,
            "computed": computed
        });
    }));
(accessor = x19(y25));
var x21, y27, y28, x22, y29, x20 = label.bind(null, "New Expression"),
    y26 = nodea(next(keyword("new"), enumeration(((x21 = memberExpression), (y27 = expected.bind(null, "new object")),
        y27(x21)), ((x22 = either(args, ((y28 = enumeration(curryExpression)), eager(y28)))), (y29 =
        expected.bind(null, "argument list")), y29(x22)))), ast_expression.NewExpression.create);
(newExpression = x20(y26));
var accessorReducer = (function(p, c) {
    return ast_expression.MemberExpression.create(SourceLocation.merge(p.loc, c.loc), p, c.property, c.computed);
}),
    y31, x24, x23 = label.bind(null, "Member Expression"),
    y30 = binds(enumeration(either(primaryExpression, newExpression), ((y31 = memo(accessor)), many(y31))), ((x24 =
        foldl.bind(null, accessorReducer)), (function() {
        var args0 = arguments;
        return always(x24.apply(null, args0));
    })));
(memberExpression = x23(y30));
var leftHandSideExpression = ((x25 = label.bind(null, "Call Expression")), (reducer0 = (function(p, c) {
    return (c.hasOwnProperty("property") ? ast_expression.MemberExpression.create(SourceLocation.merge(p.loc,
        c.loc), p, c.property, c.computed, c.checked) : ast_expression.CallExpression.create(
        SourceLocation.merge(p.loc, c.loc), p, c));
})), (y32 = binds(enumeration(memberExpression, ((y33 = either(argumentList, accessor)), many(y33))), ((x26 = foldl
    .bind(null, reducer0)), (function() {
    var args0 = arguments;
    return always(x26.apply(null, args0));
})))), x25(y32)),
    x28, y35, x29, x27 = label.bind(null, "Curry Expression"),
    reducer1 = (function(f, args0) {
        return ast_expression.CurryExpression.create(SourceLocation.merge(f.loc, args0.loc), f, [].concat(args0));
    }),
    y34 = binds(enumeration(leftHandSideExpression, many(next(punctuator("@"), ((x28 = either(argumentList,
        leftHandSideExpression)), (y35 = expected.bind(null, "curry argument")), y35(x28))))), ((x29 = foldl.bind(
        null, reducer1)), (function() {
        var args0 = arguments;
        return always(x29.apply(null, args0));
    })));
(curryExpression = x27(y34));
var x30 = label.bind(null, "Call Expression"),
    y36 = chainl1(always((function(p, c) {
        return ast_expression.CallExpression.create(SourceLocation.merge(p.loc, c.loc), p, [c]);
    })), curryExpression);
(applicationExpression = x30(y36));
var x31 = label.bind(null, "Unary Operator"),
    y37 = either(keyword("typeof", "void"), tokenParser.unaryOperator);
(unaryOperator = x31(y37));
var y39, x32 = label.bind(null, "Unary Expression"),
    reducer2 = (function(argument, op) {
        return ast_expression.UnaryExpression.create(SourceLocation.merge(op.loc, argument.loc), ast_value.UnaryOperator
            .create(op.loc, op.value), argument);
    }),
    y38 = binds(enumeration(many(unaryOperator), ((y39 = expected.bind(null, "unary argument")), y39(
        applicationExpression))), (function(ops, expression0) {
        return always(foldr(reducer2, expression0, ops));
    }));
(unaryExpression = x32(y38));
var createBinary = (function(loc, op, l, r) {
    return ast_expression.BinaryExpression.create(loc, ast_value.BinaryOperator.create(op.loc, op.value), l, r);
}),
    precedenceTable = [({
        "sep": prefixedOp("??"),
        "precedence": 0,
        "node": createBinary
    }), ({
        "sep": prefixedOp("*", "/", "%"),
        "precedence": 1,
        "node": createBinary
    }), ({
        "sep": prefixedOp("+", "-"),
        "precedence": 2,
        "node": createBinary
    }), ({
        "sep": prefixedOp("<<", ">>", ">>>"),
        "precedence": 3,
        "node": createBinary
    }), ({
        "sep": either(prefixedOp("<", ">"), keyword("instanceof")),
        "precedence": 4,
        "node": createBinary
    }), ({
        "sep": prefixedOp("==", "!="),
        "precedence": 5,
        "node": createBinary
    }), ({
        "sep": prefixedOp("&"),
        "precedence": 6,
        "node": createBinary
    }), ({
        "sep": prefixedOp("^"),
        "precedence": 7,
        "node": createBinary
    }), ({
        "sep": prefixedOp("|"),
        "precedence": 8,
        "node": createBinary
    }), ({
        "sep": prefixedOp("\\>", "\\>>"),
        "precedence": 9,
        "right": true,
        "node": createBinary
    }), ({
        "sep": prefixedOp("<\\", "<<\\"),
        "precedence": 9,
        "node": createBinary
    }), ({
        "sep": prefixedOp("|>", "|>>"),
        "precedence": 10,
        "node": createBinary
    }), ({
        "sep": prefixedOp("<|", "<<|"),
        "precedence": 10,
        "right": true,
        "node": createBinary
    }), ({
        "sep": prefixedOp("||"),
        "precedence": 11,
        "node": createBinary
    }), ({
        "sep": prefixedOp("&&"),
        "precedence": 12,
        "node": createBinary
    })],
    x33 = label.bind(null, "Binary Expression"),
    y40 = precedence(memo(unaryExpression), precedenceTable);
(binaryExpression = x33(y40));
(expression = binaryExpression);
var y42, x35, x34 = label.bind(null, "Left Hand Reference Expression"),
    y41 = either(operator, binds(enumeration(identifier, ((y42 = memo(accessor)), many(y42))), ((x35 = foldl.bind(null,
        accessorReducer)), (function() {
        var args0 = arguments;
        return always(x35.apply(null, args0));
    }))));
(leftHandReferenceExpression = x34(y41));
var leftHandMemberReference = ((x36 = label.bind(null, "Left Hand Reference Expression")), (y43 = binds(enumeration(
    identifier, ((y44 = memo(accessor)), many1(y44))), ((x37 = foldl.bind(null, accessorReducer)), (
    function() {
        var args0 = arguments;
        return always(x37.apply(null, args0));
    })))), x36(y43)),
    x38 = label.bind(null, "Assignment Expression"),
    y45 = rec((function(self) {
        var x39, y46;
        return nodea(append(attempt(enumeration(leftHandReferenceExpression, punctuator("=", ":="))),
            enumeration(((x39 = either(self, binaryExpression)), (y46 = expected.bind(null, "expression")),
                y46(x39)))), (function(loc, left, op, right) {
            return ast_expression.AssignmentExpression.create(loc, left, right, (op.value === ":="));
        }));
    }));
(assignmentExpression = x38(y45));
var deleteExpression = ((x39 = label.bind(null, "Delete Expression")), (y46 = node(next(keyword("delete"), ((y47 =
        expected.bind(null, "reference expression")), y47(leftHandMemberReference))), ast_expression.DeleteExpression
    .create)), x39(y46));
(topLevelExpression = choice(deleteExpression, assignmentExpression, binaryExpression));
(exports["arrayLiteral"] = arrayLiteral);
(exports["objectLiteral"] = objectLiteral);
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