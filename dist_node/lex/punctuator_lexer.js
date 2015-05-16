/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/punctuator_lexer.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("bennu")["text"],
    __o1 = require("bennu")["lang"],
    __o2 = require("./common"),
    punctuator, prefixOperator, infixOperator, operator, attempt = __o["attempt"],
    label = __o["label"],
    eager = __o["eager"],
    either = __o["either"],
    enumeration = __o["enumeration"],
    many = __o["many"],
    next = __o["next"],
    not = __o["not"],
    trie = __o0["trie"],
    character = __o0["character"],
    oneOf = __o0["oneOf"],
    then = __o1["then"],
    join = __o2["join"],
    operatorChar = oneOf("?+-*/%|&^<>=!~@"),
    punctuators = ["{", "}", "(", ")", "[", "]", ",", ".", ";", ":", "?", "=", ":=", "=:", "@", "..", "...", "#", "\\",
        "->", "-|", "|-"
    ];
(punctuator = label("Punctuator Lexer", trie(punctuators)));
(prefixOperator = label("Prefix Operator Lexer", eager(enumeration(either(trie(["~", "++", "--"]), attempt(then(
    character("!"), not(character("="))))), join(many(operatorChar))))));
(infixOperator = label("Infix Operator Lexer", next(not(next(trie(["->", "-|", "|-"]), not(operatorChar))), eager(
    enumeration(trie(["&&", "||", "??", "<<", ">>", ">>>", "<", ">", "==", "!=", "&", "|", "^", "+", "-",
        "*", "/", "%", "|>", "<|", "\\>", "\\>>", "<\\", "<<\\"
    ]), join(many(operatorChar)))))));
(operator = label("Operator Lexer", either(prefixOperator, infixOperator)));
(exports["punctuator"] = punctuator);
(exports["prefixOperator"] = prefixOperator);
(exports["infixOperator"] = infixOperator);
(exports["operator"] = operator);