/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/program_parser.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("bennu")["lang"],
    ast_program = require("khepri-ast")["program"],
    __o1 = require("./common"),
    __o2 = require("./package_parser"),
    __o3 = require("./statement_parser"),
    sourceElement, sourceElements, program, eager = __o["eager"],
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