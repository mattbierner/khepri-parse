/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/program_parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "khepri-ast/program", "./common", "./package_parser",
    "./statement_parser"
], (function(require, exports, __o, __o0, ast_program, __o1, __o2, __o3) {
    "use strict";
    var eager = __o["eager"],
        either = __o["either"],
        eof = __o["eof"],
        many = __o["many"],
        label = __o["label"],
        late = __o["late"],
        then = __o0["then"],
        node = __o1["node"],
        khepriPackage = __o2["khepriPackage"],
        statement = __o3["statement"],
        sourceElement, sourceElements, program;
    (sourceElement = statement);
    (sourceElements = eager(many(sourceElement)));
    (program = label("Program", node(then(either(khepriPackage, sourceElements), eof), ast_program.Program.create)));
    (exports["sourceElement"] = sourceElement);
    (exports["sourceElements"] = sourceElements);
    (exports["program"] = program);
}));