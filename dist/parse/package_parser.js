/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse/package_parser.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/lang", "khepri-ast/package", "./common", "./token_parser",
    "./value_parser", "./statement_parser"
], (function(require, exports, __o, __o0, ast_package, __o1, __o2, __o3, __o4) {
    "use strict";
    var khepriPackage, attempt = __o["attempt"],
        eager = __o["eager"],
        either = __o["either"],
        enumeration = __o["enumeration"],
        expected = __o["expected"],
        next = __o["next"],
        optional = __o["optional"],
        label = __o["label"],
        between = __o0["between"],
        sepBy = __o0["sepBy"],
        node = __o1["node"],
        nodea = __o1["nodea"],
        keyword = __o2["keyword"],
        punctuator = __o2["punctuator"],
        identifier = __o3["identifier"],
        stringLiteral = __o3["stringLiteral"],
        operator = __o3["operator"],
        withStatement = __o4["withStatement"],
        blockStatement = __o4["blockStatement"],
        symbol = either(identifier, operator),
        packageExport = label("Package Export", either(node(symbol, ast_package.PackageExport.create), nodea(
            enumeration(stringLiteral, next(punctuator(":"), identifier)), (function(loc, alias, id) {
                return ast_package.PackageExport.create(loc, id, alias);
            })))),
        packageExportList = label("Package Export List", node(between(punctuator("("), punctuator(")"), eager(
            sepBy(optional(punctuator(",")), packageExport))), ast_package.PackageExports.create)),
        packageExports = label("Package Exports", either(node(attempt(symbol), ast_package.PackageExport.create),
            packageExportList)),
        packageBody = label("Package Body", either(withStatement, blockStatement));
    (khepriPackage = label("Package", nodea(next(keyword("package"), enumeration(expected("package exports",
        packageExports), expected("package body", packageBody))), ast_package.Package.create)));
    (exports["khepriPackage"] = khepriPackage);
}));