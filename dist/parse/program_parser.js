/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/program_parser.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/lang", "khepri-ast/program", "./common", "./statement_parser",
    "./package_parser"
], (function(require, exports, __o, __o0, ast_program, __o1, _, _0) {
    "use strict";
    var eager = __o["eager"],
        either = __o["either"],
        eof = __o["eof"],
        many = __o["many"],
        label = __o["label"],
        late = __o["late"],
        then = __o0["then"],
        node = __o1["node"],
        sourceElement, sourceElements, program, statement = late((function() {
            var __o = require("./statement_parser"),
                statement = __o["statement"];
            return statement;
        })),
        khepriPackage = late((function() {
            var __o = require("./package_parser"),
                khepriPackage = __o["khepriPackage"];
            return khepriPackage;
        }));
    (sourceElement = statement);
    (sourceElements = eager(many(sourceElement)));
    (program = label("Program", node(then(either(khepriPackage, sourceElements), eof), ast_program.Program.create)));
    (exports["sourceElement"] = sourceElement);
    (exports["sourceElements"] = sourceElements);
    (exports["program"] = program);
}));