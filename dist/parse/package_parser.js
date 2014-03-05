/*
 * THIS FILE IS AUTO GENERATED from 'lib/parse/package_parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "khepri-ast/package", "./common", "./token_parser",
    "./value_parser", "./statement_parser"
], (function(require, exports, __o, __o0, ast_package, __o1, __o2, __o3, _) {
    "use strict";
    var eager = __o["eager"],
        either = __o["either"],
        enumeration = __o["enumeration"],
        expected = __o["expected"],
        next = __o["next"],
        optional = __o["optional"],
        Parser = __o["Parser"],
        between = __o0["between"],
        sepBy = __o0["sepBy"],
        node = __o1["node"],
        nodea = __o1["nodea"],
        keyword = __o2["keyword"],
        punctuator = __o2["punctuator"],
        identifier = __o3["identifier"],
        stringLiteral = __o3["stringLiteral"],
        khepriPackage, withStatement = (function() {
            var args = arguments,
                __o = require("./statement_parser"),
                withStatement = __o["withStatement"];
            return withStatement.apply(undefined, args);
        }),
        blockStatement = (function() {
            var args = arguments,
                __o = require("./statement_parser"),
                blockStatement = __o["blockStatement"];
            return blockStatement.apply(undefined, args);
        }),
        packageExport = Parser("Package Export", either(node(identifier, ast_package.PackageExport.create),
            nodea(enumeration(stringLiteral, next(punctuator(":"), identifier)), ast_package.PackageExport.create)
        )),
        packageExportList = Parser("Package Export List", node(between(punctuator("("), punctuator(")"), eager(
            sepBy(optional(null, punctuator(",")), packageExport))), ast_package.PackageExports.create)),
        packageExports = Parser("Package Exports", either(packageExportList, node(identifier, ast_package.PackageExport
            .create))),
        packageBody = Parser("Package Body", either(withStatement, blockStatement));
    (khepriPackage = Parser("Package", nodea(next(keyword("package"), enumeration(expected("package exports",
        packageExports), packageBody)), ast_package.Package.create)));
    (exports.khepriPackage = khepriPackage);
}));