/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/package_parser.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    eager = __o["eager"],
    either = __o["either"],
    enumeration = __o["enumeration"],
    expected = __o["expected"],
    next = __o["next"],
    optional = __o["optional"],
    label = __o["label"],
    late = __o["late"],
    __o0 = require("bennu")["lang"],
    between = __o0["between"],
    sepBy = __o0["sepBy"],
    ast_package = require("khepri-ast")["package"],
    __o1 = require("./common"),
    node = __o1["node"],
    nodea = __o1["nodea"],
    __o2 = require("./token_parser"),
    keyword = __o2["keyword"],
    punctuator = __o2["punctuator"],
    __o3 = require("./value_parser"),
    identifier = __o3["identifier"],
    stringLiteral = __o3["stringLiteral"],
    __o4 = require("./statement_parser"),
    withStatement = __o4["withStatement"],
    blockStatement = __o4["blockStatement"],
    khepriPackage, packageExport = label("Package Export", either(node(identifier, ast_package.PackageExport.create),
        nodea(enumeration(stringLiteral, next(punctuator(":"), identifier)), (function(loc, alias, id) {
            return ast_package.PackageExport.create(loc, id, alias);
        })))),
    packageExportList = label("Package Export List", node(between(punctuator("("), punctuator(")"), eager(sepBy(
        optional(punctuator(",")), packageExport))), ast_package.PackageExports.create)),
    packageExports = label("Package Exports", either(packageExportList, node(identifier, ast_package.PackageExport.create))),
    packageBody = label("Package Body", either(withStatement, blockStatement));
(khepriPackage = label("Package", nodea(next(keyword("package"), enumeration(expected("package exports", packageExports),
    expected("package body", packageBody))), ast_package.Package.create)));
(exports["khepriPackage"] = khepriPackage);