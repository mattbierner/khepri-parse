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
    var always = __o["always"],
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
        token = __o["token"],
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
        arrayLiteral, objectLiteral, operatorExpression, letExpression, primaryExpression, accessor,
            memberExpression, newExpression, curryExpression, applicationExpression, unaryOperator,
            unaryExpression, binaryExpression, conditionalExpression, leftHandReferenceExpression,
            assignmentExpression, expression, topLevelExpression, arg, reducer, x0, y0, x3, y3,
            functionExpression = late((function() {
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
    var unaryOperatorExpression = label("Unary Operator Expression", choice(value.unaryOperator, keyword(
                "typeof", "void")
            .map((function(__o5) {
                var loc = __o5["loc"],
                    value0 = __o5["value"];
                return ast_value.UnaryOperator.create(loc, value0);
            })), attempt(next(punctuator("."), identifier)
                .map((function(__o5) {
                    var loc = __o5["loc"],
                        name = __o5["name"];
                    return ast_value.UnaryOperator.create(loc, ("." + name));
                }))))
        .map((function(op) {
            return ast_expression.OperatorExpression.create(op.loc, op);
        }))),
        binaryOperatorExpression = label("Binary Operator Expression", nodea(cons(optional(keyword("_")),
            either(enumeration(either(keyword("new"), punctuator(".")), optional(next(punctuator(","),
                expression))), enumeration(choice(keyword("instanceof"), punctuator("@"),
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
        })))), (function(loc, __o5) {
        var x = __o5[0],
            computed = __o5[1];
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
    (unaryOperator = label("Unary Operator", either(keyword("typeof", "void"), tokenParser.unaryOperator)));
    var reducer1;
    (unaryExpression = label("Unary Expression", ((reducer1 = (function(argument, op) {
        return ast_expression.UnaryExpression.create(SourceLocation.merge(op.loc, argument.loc),
            ast_value.UnaryOperator.create(op.loc, op.value), argument);
    })), binds(enumeration(many(unaryOperator), expected("unary argument", applicationExpression)), (
        function(ops, expression0) {
            return always(foldr(reducer1, expression0, ops));
        })))));
    var createBinary = (function(loc, op, l, r) {
        return ast_expression.BinaryExpression.create(loc, ast_value.BinaryOperator.create(op.loc, op.value),
            l, r);
    }),
        precedenceTable = [({
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
            "sep": either(prefixedOp("<", ">", "<=", ">="), keyword("instanceof")),
            "precedence": 4,
            "node": createBinary
        }), ({
            "sep": prefixedOp("==", "!=", "===", "!=="),
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
    var x2, y2;
    (leftHandReferenceExpression = label("Left Hand Reference Expression", either(operator, binds(enumeration(
        identifier, many(memo(accessor))), ((x2 = foldl.bind(null, (function(p, c) {
        return ast_expression.MemberExpression.create(SourceLocation.merge(p.loc,
            c.loc), p, c.property, c.computed);
    }))), (y2 = always), (function() {
        return y2(x2.apply(null, arguments));
    }))))));
    var leftHandMemberReference = label("Left Hand Reference Expression", binds(enumeration(identifier, many1(
        memo(accessor))), ((x3 = foldl.bind(null, (function(p, c) {
        return ast_expression.MemberExpression.create(SourceLocation.merge(p.loc, c.loc),
            p, c.property, c.computed);
    }))), (y3 = always), (function() {
        return y3(x3.apply(null, arguments));
    }))));
    (assignmentExpression = label("Assignment Expression", rec((function(self) {
        return nodea(append(attempt(enumeration(leftHandReferenceExpression, punctuator("=",
            ":="))), enumeration(expected("expression", either(self, expression)))), (
            function(loc, left, op, right) {
                return ast_expression.AssignmentExpression.create(loc, op.value, left,
                    right);
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