/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/program_parser.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    eager = __o["eager"],
    either = __o["either"],
    eof = __o["eof"],
    many = __o["many"],
    label = __o["label"],
    late = __o["late"],
    __o0 = require("bennu")["lang"],
    then = __o0["then"],
    ast_program = require("khepri-ast")["program"],
    __o1 = require("./common"),
    node = __o1["node"],
    __o2 = require("./package_parser"),
    khepriPackage = __o2["khepriPackage"],
    __o3 = require("./statement_parser"),
    statement = __o3["statement"],
    sourceElement, sourceElements, program;
(sourceElement = statement);
(sourceElements = eager(many(sourceElement)));
(program = label("Program", node(then(either(khepriPackage, sourceElements), eof), ast_program.Program.create)));
(exports["sourceElement"] = sourceElement);
(exports["sourceElements"] = sourceElements);
(exports["program"] = program);