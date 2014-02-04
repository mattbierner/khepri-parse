define(['bennu/parse', 'khepri/lex/number_lexer'], function(parse, number_lexer){
    return {
        'module': "Number Tests",
        'tests': [
            ["decimal",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.decimal, '.'), '.');
            };
            ["negative sign",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.negativeSign, '-'), '-');
            };
            ["positive sign",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.positiveSign, '+'), '+');
            };
            ["exponent indicator",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.exponentIndicator, 'e'), 'e');
                test.equal(parse.run(number_lexer.exponentIndicator, 'E'), 'E');
            };
            ["hex indicator",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.hexIndicator, '0x'), '0x');
                test.equal(parse.run(number_lexer.hexIndicator, '0X'), '0X');
            };
            
            ["Decimal Digit",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.decimalDigit, '0'), '0');
                test.equal(parse.run(number_lexer.decimalDigit, '1'), '1');
                test.equal(parse.run(number_lexer.decimalDigit, '2'), '2');
                test.equal(parse.run(number_lexer.decimalDigit, '3'), '3');
                test.equal(parse.run(number_lexer.decimalDigit, '4'), '4');
                test.equal(parse.run(number_lexer.decimalDigit, '5'), '5');
                test.equal(parse.run(number_lexer.decimalDigit, '6'), '6');
                test.equal(parse.run(number_lexer.decimalDigit, '7'), '7');
                test.equal(parse.run(number_lexer.decimalDigit, '8'), '8');
                test.equal(parse.run(number_lexer.decimalDigit, '9'), '9');
            };
            ["Non zero Decimal Digit",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.nonZeroDigit, '1'), '1');
                test.equal(parse.run(number_lexer.nonZeroDigit, '2'), '2');
                test.equal(parse.run(number_lexer.nonZeroDigit, '3'), '3');
                test.equal(parse.run(number_lexer.nonZeroDigit, '4'), '4');
                test.equal(parse.run(number_lexer.nonZeroDigit, '5'), '5');
                test.equal(parse.run(number_lexer.nonZeroDigit, '6'), '6');
                test.equal(parse.run(number_lexer.nonZeroDigit, '7'), '7');
                test.equal(parse.run(number_lexer.nonZeroDigit, '8'), '8');
                test.equal(parse.run(number_lexer.nonZeroDigit, '9'), '9');
                
                test.throws(parse.run.bind(undefined, number_lexer.nonZeroDigit, '0'));
            };
            ["Hex Digit",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.hexDigit, '0'), '0');
                test.equal(parse.run(number_lexer.hexDigit, '1'), '1');
                test.equal(parse.run(number_lexer.hexDigit, '2'), '2');
                test.equal(parse.run(number_lexer.hexDigit, '3'), '3');
                test.equal(parse.run(number_lexer.hexDigit, '4'), '4');
                test.equal(parse.run(number_lexer.hexDigit, '5'), '5');
                test.equal(parse.run(number_lexer.hexDigit, '6'), '6');
                test.equal(parse.run(number_lexer.hexDigit, '7'), '7');
                test.equal(parse.run(number_lexer.hexDigit, '8'), '8');
                test.equal(parse.run(number_lexer.hexDigit, '9'), '9');
                test.equal(parse.run(number_lexer.hexDigit, 'a'), 'a');
                test.equal(parse.run(number_lexer.hexDigit, 'b'), 'b');
                test.equal(parse.run(number_lexer.hexDigit, 'c'), 'c');
                test.equal(parse.run(number_lexer.hexDigit, 'd'), 'd');
                test.equal(parse.run(number_lexer.hexDigit, 'e'), 'e');
                test.equal(parse.run(number_lexer.hexDigit, 'f'), 'f');
                test.equal(parse.run(number_lexer.hexDigit, 'A'), 'A');
                test.equal(parse.run(number_lexer.hexDigit, 'B'), 'B');
                test.equal(parse.run(number_lexer.hexDigit, 'C'), 'C');
                test.equal(parse.run(number_lexer.hexDigit, 'D'), 'D');
                test.equal(parse.run(number_lexer.hexDigit, 'E'), 'E');
                test.equal(parse.run(number_lexer.hexDigit, 'F'), 'F');
            };
            ["Decimal Digits",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.decimalDigits, '012'), '012');
                test.equal(parse.run(number_lexer.decimalDigits, '123a3'), '123');
            };
            ["Hex Digits",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.hexDigits, '0a21f'), '0a21f');
                test.equal(parse.run(number_lexer.hexDigits, 'ba1'), 'ba1');
            };
            
            ["Unsigned Integer",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.unsignedInteger, '012'), 12);
                test.equal(parse.run(number_lexer.unsignedInteger, '123a3'), 123);
                
                test.throws(parse.run.bind(undefined, number_lexer.unsignedInteger, '-3'));
                test.throws(parse.run.bind(undefined, number_lexer.unsignedInteger, '+3'));
            };
            ["Signed Integer",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.signedInteger, '012'), 12);
                test.equal(parse.run(number_lexer.signedInteger, '123a3'), 123);
                
                test.equal(parse.run(number_lexer.signedInteger, '-391'), -391);
                test.equal(parse.run(number_lexer.signedInteger, '+391'), 391);
            };
            
            ["Exponent Part",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.exponentPart, 'e012'), 12);
                test.equal(parse.run(number_lexer.exponentPart, 'E123a3'), 123);
                
                test.equal(parse.run(number_lexer.exponentPart, 'e-391'), -391);
                test.equal(parse.run(number_lexer.exponentPart, 'E+391'), 391);
            };
            
            ["Hex Integer Literal",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.hexIntegerLiteral, '0x00123'), 291);
                test.equal(parse.run(number_lexer.hexIntegerLiteral, '0XAf01'), 44801);
            };
            ["Decimal Integer Literal",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.decimalIntegerLiteral, '00123'), 123);
                test.equal(parse.run(number_lexer.decimalIntegerLiteral, '99'), 99);
            };
            ["Decimal Literal",
            exports. = function(test) {
                test.equal(parse.run(number_lexer.decimalLiteral, '00123'), 123);
                test.equal(parse.run(number_lexer.decimalLiteral, '123.'), 123);
                test.equal(parse.run(number_lexer.decimalLiteral, '99.9'), 99.9);
                test.equal(parse.run(number_lexer.decimalLiteral, '0.123'), .123);
                
                test.equal(parse.run(number_lexer.decimalLiteral, '00123e3'), 123000);
                test.equal(parse.run(number_lexer.decimalLiteral, '123.0e3'), 123000);
                test.equal(parse.run(number_lexer.decimalLiteral, '99.9e3'), 99900);
                test.equal(parse.run(number_lexer.decimalLiteral, '0.123e3'), 123);
                
                test.equal(parse.run(number_lexer.decimalLiteral, '00123e+3'), 123000);
                test.equal(parse.run(number_lexer.decimalLiteral, '123.0e+3'), 123000);
                test.equal(parse.run(number_lexer.decimalLiteral, '99.9e+3'), 99900);
                test.equal(parse.run(number_lexer.decimalLiteral, '0.123e+3'), 123);
                
                test.equal(parse.run(number_lexer.decimalLiteral, '00123e-3'), 0.123);
                test.equal(parse.run(number_lexer.decimalLiteral, '123.0e-3'), 0.123);
                test.equal(parse.run(number_lexer.decimalLiteral, '99.9e-3'), 0.0999);
                test.equal(parse.run(number_lexer.decimalLiteral, '0.123e-3'), 0.000123);
            };
        ],
    };
});
