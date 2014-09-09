/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/expression_parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "nu-stream/stream", "khepri-ast/declaration",
    "khepri-ast/expression", "khepri-ast/value", "khepri-ast/position", "./common", "./token_parser",
    "./value_parser", "./pattern_parser", "./function_parser"
], (function(require, exports, __o, __o0, __o1, ast_declaration, ast_expression, ast_value, __o2, __o3, tokenParser,
    value, __o4, _) {
    "use strict";
    var arrayLiteral, objectLiteral, operatorExpression, letExpression, primaryExpression, accessor,
            memberExpression, newExpression, curryExpression, applicationExpression, unaryOperator,
            unaryExpression, binaryExpression, conditionalExpression, leftHandReferenceExpression,
            assignmentExpression, expression, topLevelExpression, always = __o["always"],
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
        arg, reducer, x, reducer0, x1, x4, functionExpression = late((function() {
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
    (objectLiteral = label("Object Literal", ((propertyName = choice(stringLiteral, numericLiteral, identifier)), (
        propertyInitializer = label("Property Initializer", nodea(enumeration(then(propertyName,
            punctuator(":")), expression), ast_value.ObjectValue.create))), (objectProperties =
        sepBy(punctuator(","), expected("object property", propertyInitializer))), node(between(
            punctuator("{"), punctuator("}"), eager(objectProperties)), ast_expression.ObjectExpression
        .create))));
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
    var argumentList = label("Argument List", either(attempt(node(operatorExpression, (function(loc, x) {
        var a = [x];
        (a.loc = loc);
        return a;
    }))), args)),
        dotExpression = ((reducer = (function(p, c) {
            return (c.hasOwnProperty("property") ? ast_expression.MemberExpression.create((p ?
                    SourceLocation.merge(p.loc, c.loc) : c.loc), p, c.property, c.computed) :
                ast_expression.CallExpression.create((p ? SourceLocation.merge(p.loc, c.loc) : c.loc),
                    p, c));
        })), bind(cons(accessor, many(either(argumentList, accessor))), ((x = foldl.bind(null, reducer,
            null)), (function(z) {
            return always(x(z));
        })))),
        unaryOperatorExpression = label("Unary Operator Expression", choice(value.unaryOperator, keyword(
                    "typeof", "void")
                .map((function(__o5) {
                    var loc = __o5["loc"],
                        value0 = __o5["value"];
                    return ast_value.UnaryOperator.create(loc, value0);
                })), attempt(dotExpression.map((function(expr) {
                    return ast_value.UnaryOperator.create(expr.loc, expr);
                }))))
            .map((function(op) {
                return ast_expression.OperatorExpression.create(op.loc, op);
            }))),
        binaryOperatorExpression = label("Binary Operator Expression", nodea(cons(optional(keyword("_")),
            either(enumeration(either(keyword("new"), punctuator(".", "??")), optional(next(punctuator(
                ","), expression))), enumeration(choice(keyword("instanceof"), punctuator("@"),
                tokenParser.binaryOperator), optional(next(optional(punctuator(",")),
                expression))))), (function(loc, flipped, op, arg0) {
            var operator0 = ast_expression.OperatorExpression.create(loc, ast_value.BinaryOperator.create(
                loc, op.value), flipped);
            return (arg0 ? ast_expression.CurryExpression.create(loc, operator0, [arg0]) :
                operator0);
        }))),
        ternayOperatorExpression = label("Ternary Operator Expression", punctuator("?")
            .map((function(__o5) {
                var loc = __o5["loc"],
                    value0 = __o5["value"];
                return ast_expression.OperatorExpression.create(loc, ast_value.TernaryOperator.create(
                    loc, value0));
            })));
    (operatorExpression = label("Operator Expression", between(punctuator("("), punctuator(")"), choice(
        unaryOperatorExpression, binaryOperatorExpression, ternayOperatorExpression))));
    (primaryExpression = label("Primary Expression", choice(letExpression, conditionalExpression, identifier,
        literal, arrayLiteral, objectLiteral, functionExpression, attempt(operatorExpression),
        dotExpression.map((function(expr) {
            return ast_expression.OperatorExpression.create(expr.loc, expr);
        })), between(punctuator("("), punctuator(")"), expected("expression", expression)))));
    var accessorTarget = either(identifier.map((function(x0) {
            return [x0, false];
        })), between(punctuator("("), punctuator(")"), expected("accessor expression", expression))
        .map((function(x0) {
            return [x0, true];
        })));
    (accessor = label("Accessor", node(next(punctuator("."), accessorTarget), (function(loc, __o5) {
        var x0 = __o5[0],
            computed = __o5[1];
        return ({
            "loc": loc,
            "property": x0,
            "computed": computed
        });
    }))));
    (newExpression = label("New Expression", nodea(next(keyword("new"), enumeration(expected("new object",
        memberExpression), expected("argument list", either(args, eager(enumeration(
        curryExpression)))))), ast_expression.NewExpression.create)));
    var x0;
    (memberExpression = label("Member Expression", binds(enumeration(either(primaryExpression, newExpression),
        many(memo(accessor))), ((x0 = foldl.bind(null, (function(p, c) {
        return ast_expression.MemberExpression.create(SourceLocation.merge(p.loc, c
            .loc), p, c.property, c.computed);
    }))), (function() {
        var args0 = arguments;
        return always(x0.apply(null, args0));
    })))));
    var leftHandSideExpression = label("Call Expression", ((reducer0 = (function(p, c) {
        return (c.hasOwnProperty("property") ? ast_expression.MemberExpression.create(
                SourceLocation.merge(p.loc, c.loc), p, c.property, c.computed, c.checked) :
            ast_expression.CallExpression.create(SourceLocation.merge(p.loc, c.loc), p, c));
    })), binds(enumeration(memberExpression, many(either(argumentList, accessor))), ((x1 = foldl.bind(
        null, reducer0)), (function() {
        var args0 = arguments;
        return always(x1.apply(null, args0));
    }))))),
        reducer1, x2;
    (curryExpression = label("Curry Expression", ((reducer1 = (function(f, args0) {
        return ast_expression.CurryExpression.create(SourceLocation.merge(f.loc, args0.loc),
            f, [].concat(args0));
    })), binds(enumeration(leftHandSideExpression, many(next(punctuator("@"), expected(
        "curry argument", either(argumentList, leftHandSideExpression))))), ((x2 = foldl.bind(
        null, reducer1)), (function() {
        var args0 = arguments;
        return always(x2.apply(null, args0));
    }))))));
    (applicationExpression = label("Call Expression", chainl1(always((function(p, c) {
        return ast_expression.CallExpression.create(SourceLocation.merge(p.loc, c.loc), p, [
            c
        ]);
    })), curryExpression)));
    (unaryOperator = label("Unary Operator", either(keyword("typeof", "void"), tokenParser.unaryOperator)));
    var reducer2;
    (unaryExpression = label("Unary Expression", ((reducer2 = (function(argument, op) {
        return ast_expression.UnaryExpression.create(SourceLocation.merge(op.loc, argument.loc),
            ast_value.UnaryOperator.create(op.loc, op.value), argument);
    })), binds(enumeration(many(unaryOperator), expected("unary argument", applicationExpression)), (
        function(ops, expression0) {
            return always(foldr(reducer2, expression0, ops));
        })))));
    var createBinary = (function(loc, op, l, r) {
        return ast_expression.BinaryExpression.create(loc, ast_value.BinaryOperator.create(op.loc, op.value),
            l, r);
    }),
        precedenceTable = [({
            "sep": punctuator("??"),
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
            "sep": prefixedOp("|>"),
            "precedence": 10,
            "node": createBinary
        }), ({
            "sep": prefixedOp("<|"),
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
        })];
    (binaryExpression = label("Binary Expression", precedence(memo(unaryExpression), precedenceTable)));
    (expression = binaryExpression);
    var x3;
    (leftHandReferenceExpression = label("Left Hand Reference Expression", either(operator, binds(enumeration(
        identifier, many(memo(accessor))), ((x3 = foldl.bind(null, (function(p, c) {
        return ast_expression.MemberExpression.create(SourceLocation.merge(p.loc,
            c.loc), p, c.property, c.computed);
    }))), (function() {
        var args0 = arguments;
        return always(x3.apply(null, args0));
    }))))));
    var leftHandMemberReference = label("Left Hand Reference Expression", binds(enumeration(identifier, many1(
        memo(accessor))), ((x4 = foldl.bind(null, (function(p, c) {
        return ast_expression.MemberExpression.create(SourceLocation.merge(p.loc, c.loc),
            p, c.property, c.computed);
    }))), (function() {
        var args0 = arguments;
        return always(x4.apply(null, args0));
    }))));
    (assignmentExpression = label("Assignment Expression", rec((function(self) {
        return nodea(append(attempt(enumeration(leftHandReferenceExpression, punctuator("=",
            ":="))), enumeration(expected("expression", either(self, expression)))), (
            function(loc, left, op, right) {
                return ast_expression.AssignmentExpression.create(loc, left, right, (op.value ===
                    ":="));
            }));
    }))));
    var deleteExpression = label("Delete Expression", node(next(keyword("delete"), expected(
        "reference expression", leftHandMemberReference)), (function(loc, expression0) {
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