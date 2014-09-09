var literal = function(kind, test, expr, value) {
    test.equal(expr.type, 'Literal');
    test.equal(expr.kind, kind);
    test.equal(expr.value, value);
};

exports.number = literal.bind(null, 'number');

exports.string = literal.bind(null, 'string');

exports.id = function(test, expr, name) {
    test.equal(expr.type, 'Identifier');
    test.equal(expr.name, name);
};

exports.binaryOp = function(test, name, expr) {
    test.equal(expr.type, 'BinaryOperator');
    test.equal(expr.name, name);
};

exports.idPattern = function(test, expr, name) {
    test.equal(expr.type, 'IdentifierPattern');
    exports.id(test, expr.id, name);
};

exports.ellipsisPattern = function(test, expr, name) {
    test.equal(expr.type, 'EllipsisPattern');
    exports.idPattern(test, expr.id, name);
};