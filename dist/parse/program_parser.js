/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/program_parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "khepri-ast/program", "./common", "./package_parser",
    "./statement_parser"
], (function(require, exports, __o, __o0, ast_program, __o1, __o2, __o3) {
    "use strict";
    var sourceElement, sourceElements, program, eager = __o["eager"],
        either = __o["either"],
        eof = __o["eof"],
        many = __o["many"],
        label = __o["label"],
        then = __o0["then"],
        node = __o1["node"],
        khepriPackage = __o2["khepriPackage"],
        statement = __o3["statement"];
    (sourceElement = statement);
    var y = many(statement);
    (sourceElements = eager(y));
    var x = label.bind(null, "Program"),
        y0 = node(then(either(khepriPackage, sourceElements), eof), ast_program.Program.create);
    (program = x(y0));
    (exports["sourceElement"] = sourceElement);
    (exports["sourceElements"] = sourceElements);
    (exports["program"] = program);
}));