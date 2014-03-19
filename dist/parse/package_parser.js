/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/package_parser.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/lang", "khepri-ast/package", "./common", "./token_parser",
    "./value_parser", "./statement_parser"
], (function(require, exports, __o, __o0, ast_package, __o1, __o2, __o3, _) {
    "use strict";
    var eager = __o["eager"],
        either = __o["either"],
        enumeration = __o["enumeration"],
        expected = __o["expected"],
        next = __o["next"],
        optional = __o["optional"],
        label = __o["label"],
        late = __o["late"],
        between = __o0["between"],
        sepBy = __o0["sepBy"],
        node = __o1["node"],
        nodea = __o1["nodea"],
        keyword = __o2["keyword"],
        punctuator = __o2["punctuator"],
        identifier = __o3["identifier"],
        stringLiteral = __o3["stringLiteral"],
        khepriPackage, withStatement = late((function() {
            var __o = require("./statement_parser"),
                withStatement = __o["withStatement"];
            return withStatement;
        })),
        blockStatement = late((function() {
            var __o = require("./statement_parser"),
                blockStatement = __o["blockStatement"];
            return blockStatement;
        })),
        packageExport = label("Package Export", either(node(identifier, ast_package.PackageExport.create),
            nodea(enumeration(stringLiteral, next(punctuator(":"), identifier)), (function(loc, alias, id) {
                return ast_package.PackageExport.create(loc, id, alias);
            })))),
        packageExportList = label("Package Export List", node(between(punctuator("("), punctuator(")"), eager(
            sepBy(optional(null, punctuator(",")), packageExport))), ast_package.PackageExports.create)),
        packageExports = label("Package Exports", either(packageExportList, node(identifier, ast_package.PackageExport
            .create))),
        packageBody = label("Package Body", either(withStatement, blockStatement));
    (khepriPackage = label("Package", nodea(next(keyword("package"), enumeration(expected("package exports",
        packageExports), expected("package body", packageBody))), ast_package.Package.create)));
    (exports["khepriPackage"] = khepriPackage);
}));