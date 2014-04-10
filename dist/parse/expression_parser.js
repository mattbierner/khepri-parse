/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/expression_parser.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/lang", "nu-stream/stream", "khepri-ast/declaration",
    "khepri-ast/expression", "khepri-ast/value", "khepri-ast/position", "./common", "./token_parser",
    "./value_parser", "./pattern_parser", "./function_parser"
], (function(require, exports, __o, __o0, __o1, ast_declaration, ast_expression, ast_value, __o2, __o3, __o4, __o5,
    __o6, _) {
    "use strict";
    var always = __o["always"],
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
        keyword = __o4["keyword"],
        punctuator = __o4["punctuator"],
        identifier = __o5["identifier"],
        literal = __o5["literal"],
        stringLiteral = __o5["stringLiteral"],
        topLevelPattern = __o6["topLevelPattern"],
        arrayLiteral, objectLiteral, operatorExpression, letExpression, primaryExpression, accessor,
            memberExpression, newExpression, curryExpression, applicationExpression, unaryOperator,
            unaryExpression, binaryExpression, conditionalExpression, leftHandReferenceExpression,
            assignmentExpression, expression, topLevelExpression, arg, reducer, x0, y0, functionExpression =
            late((function() {
                var __o7 = require("./function_parser"),
                    functionExpression0 = __o7["functionExpression"];
                return functionExpression0;
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
    var args = label("Arguments", ((arg = expression), node(between(punctuator("("), punctuator(")"), eager(
        sepBy(punctuator(","), expected("argument", arg)))), (function(loc, x) {
        (x.loc = loc);
        return x;
    })))),
        arrayElement, arrayElements;
    (arrayLiteral = label("Array Literal", ((arrayElement = expression), (arrayElements = sepBy(punctuator(","),
        expected("array element", arrayElement))), node(between(punctuator("["), punctuator("]"),
        eager(arrayElements)), ast_expression.ArrayExpression.create))));
    var propertyName, propertyInitializer, objectProperties;
    (objectLiteral = label("Object Literal", ((propertyName = stringLiteral), (propertyInitializer = label(
        "Property Initializer", nodea(enumeration(then(propertyName, punctuator(":")),
            expression), ast_value.ObjectValue.create))), (objectProperties = sepBy(punctuator(","),
        expected("object property", propertyInitializer))), node(between(punctuator("{"),
        punctuator("}"), eager(objectProperties)), ast_expression.ObjectExpression.create))));
    var letBinding = label("Let Binding", nodea(enumeration(expected("pattern", topLevelPattern), punctuator(
        "=", "=:", ":="), expected("bound value", expression)), (function(loc, pattern, rec0, expr) {
        return ast_declaration.Binding.create(loc, pattern, expr, (rec0.value === ":="));
    }))),
        letBindings, letBody;
    (letExpression = label("Let Expression", ((letBindings = sepBy1(punctuator(","), letBinding)), (letBody =
        expression), nodea(next(keyword("let"), enumeration(expected("let bindings", eager(
            letBindings)), next(keyword("in"), expected("let body expression", letBody)))),
        ast_expression.LetExpression.create))));
    (conditionalExpression = label("Conditional Expression", nodea(next(punctuator("?"), enumeration(expression,
            next(punctuator(":"), expected("conditional consequent expression", expression)), next(
                punctuator(":"), expected("conditional alternate expression", expression)))),
        ast_expression.ConditionalExpression.create)));
    var unaryOperatorExpression = label("Unary Operator Expression", bind(either(keyword("typeof"), punctuator(
        "void", "~", "!", "++", "--")), (function(__o7) {
        var loc = __o7["loc"],
            value = __o7["value"];
        return always(ast_expression.UnaryOperatorExpression.create(loc, value));
    }))),
        binaryOperatorExpression = label("Binary Operator Expression", nodea(enumeration(optional(false,
            keyword("_")), either(keyword("instanceof", "new"), punctuator(".", "*", "/", "+", "-",
            "%", "<<", ">>", ">>>", "<", ">", "<=", ">=", "==", "!=", "===", "!==", "&", "^",
            "|", "||", "&&", "|>", "\\>", "\\>>", "<|", "<\\", "<<\\", "@"))), (function(loc, flipped,
            op) {
            return ast_expression.BinaryOperatorExpression.create(loc, op.value, (!(!flipped)));
        }))),
        ternayOperatorExpression = label("Ternary Operator Expression", bind(punctuator("?"), (function(__o7) {
            var loc = __o7["loc"],
                value = __o7["value"];
            return always(ast_expression.TernaryOperatorExpression.create(loc, value));
        }))),
        op;
    (operatorExpression = label("Operator Expression", ((op = choice(unaryOperatorExpression,
        binaryOperatorExpression, ternayOperatorExpression)), nodea(between(punctuator("("),
        punctuator(")"), enumeration(op, optional(null, next(punctuator(","), eager(sepBy1(
            punctuator(","), expected("argument", expression))))))), (function(loc, target,
        args0) {
        return (args0 ? ast_expression.CurryExpression.create(loc, target, args0) : target);
    })))));
    (primaryExpression = label("Primary Expression", choice(letExpression, conditionalExpression, identifier,
        literal, arrayLiteral, objectLiteral, functionExpression, attempt(operatorExpression), between(
            punctuator("("), punctuator(")"), expected("expression", expression)))));
    var argumentList = label("Argument List", either(attempt(node(operatorExpression, (function(loc, x) {
        var a = [x];
        (a.loc = loc);
        return a;
    }))), args));
    (accessor = label("Accessor", node(next(punctuator("."), either(identifier.map((function(x) {
            return [x, false];
        })), between(punctuator("("), punctuator(")"), expected("accessor expression",
            expression))
        .map((function(x) {
            return [x, true];
        })))), (function(loc, __o7) {
        var x = __o7[0],
            computed = __o7[1];
        return ({
            "loc": loc,
            "property": x,
            "computed": computed
        });
    }))));
    (newExpression = label("New Expression", nodea(next(keyword("new"), enumeration(expected(
        "member expression", memberExpression), expected("argument list", either(args,
        eager(enumeration(curryExpression)))))), ast_expression.NewExpression.create)));
    var x, y;
    (memberExpression = label("Member Expression", binds(enumeration(either(primaryExpression, newExpression),
        many(memo(accessor))), ((x = foldl.bind(null, (function(p, c) {
        return ast_expression.MemberExpression.create(SourceLocation.merge(p.loc, c
            .loc), p, c.property, c.computed);
    }))), (y = always), (function() {
        return y(x.apply(null, arguments));
    })))));
    var leftHandSideExpression = label("Call Expression", ((reducer = (function(p, c) {
        return (c.hasOwnProperty("property") ? ast_expression.MemberExpression.create(
                SourceLocation.merge(p.loc, c.loc), p, c.property, c.computed) : ast_expression
            .CallExpression.create(SourceLocation.merge(p.loc, c.loc), p, c));
    })), binds(enumeration(memberExpression, many(either(argumentList, accessor))), ((x0 = foldl.bind(
        null, reducer)), (y0 = always), (function() {
        return y0(x0.apply(null, arguments));
    }))))),
        reducer0, x1, y1;
    (curryExpression = label("Curry Expression", ((reducer0 = (function(f, args0) {
        return ast_expression.CurryExpression.create(SourceLocation.merge(f.loc, args0.loc),
            f, [].concat(args0));
    })), binds(enumeration(leftHandSideExpression, many(next(punctuator("@"), expected(
        "curry argument", either(argumentList, leftHandSideExpression))))), ((x1 = foldl.bind(
        null, reducer0)), (y1 = always), (function() {
        return y1(x1.apply(null, arguments));
    }))))));
    (applicationExpression = label("Call Expression", chainl1(always((function(p, c) {
        return ast_expression.CallExpression.create(SourceLocation.merge(p.loc, c.loc), p, [
            c
        ]);
    })), curryExpression)));
    (unaryOperator = label("Unary Operator", either(keyword("typeof", "void"), punctuator("++", "--", "~", "!"))));
    var reducer1;
    (unaryExpression = label("Unary Expression", ((reducer1 = (function(argument, op0) {
        return ast_expression.UnaryExpression.create(SourceLocation.merge(op0.loc, argument
            .loc), op0.value, argument);
    })), binds(enumeration(many(unaryOperator), expected("unary argument", applicationExpression)), (
        function(ops, expression0) {
            return always(foldr(reducer1, expression0, ops));
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
    var x2, y2;
    (leftHandReferenceExpression = label("Left Hand Reference Expression", binds(enumeration(identifier, many(
        memo(accessor))), ((x2 = foldl.bind(null, (function(p, c) {
        return ast_expression.MemberExpression.create(SourceLocation.merge(p.loc, c
            .loc), p, c.property, c.computed);
    }))), (y2 = always), (function() {
        return y2(x2.apply(null, arguments));
    })))));
    (assignmentExpression = label("Assignment Expression", rec((function(self) {
        return nodea(append(attempt(enumeration(leftHandReferenceExpression, punctuator("=",
            ":="))), enumeration(expected("expression", either(self, expression)))), (
            function(loc, left, op0, right) {
                return ast_expression.AssignmentExpression.create(loc, op0.value, left,
                    right);
            }));
    }))));
    var deleteExpression = label("Delete Expression", node(next(keyword("delete"), expected(
        "reference expression", leftHandReferenceExpression)), (function(loc, expression0) {
        return ast_expression.UnaryExpression.create(loc, "delete", expression0);
    })));
    (topLevelExpression = choice(deleteExpression, assignmentExpression, expression));
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
}));