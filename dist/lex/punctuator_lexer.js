/*
 * THIS FILE IS AUTO GENERATED from 'lib/lex/punctuator_lexer.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/text", "bennu/lang", "nu-stream/stream"], (function(require,
    exports, __o, __o0, __o1, __o2) {
    "use strict";
    var punctuator, prefixOperator, infixOperator, operator, attempt = __o["attempt"],
        label = __o["label"],
        eager = __o["eager"],
        either = __o["either"],
        enumeration = __o["enumeration"],
        map = __o["map"],
        many = __o["many"],
        next = __o["next"],
        not = __o["not"],
        trie = __o0["trie"],
        character = __o0["character"],
        oneOf = __o0["oneOf"],
        then = __o1["then"],
        foldl = __o2["foldl"],
        __add = (function(x, y) {
            return (x + y);
        }),
        join = map.bind(null, foldl.bind(null, __add, "")),
        punctuators = ["{", "}", "(", ")", "[", "]", ",", ".", ";", ":", "?", "=", ":=", "=:", "@", "...", "#",
            "\\", "->", "§", "-|", "|-"
        ];
    (punctuator = label("Punctuator Lexer", trie(punctuators)));
    var operatorChar = oneOf("?+-*/%|&^<>=!~@");
    (prefixOperator = label("Prefix Operator Lexer", eager(enumeration(either(trie(["~", "++", "--"]), attempt(
        then(character("!"), not(character("="))))), join(many(operatorChar))))));
    (infixOperator = label("Infix Operator Lexer", next(not(punctuator), eager(enumeration(trie(["&&", "||",
        "<<", ">>", ">>>", "<=", "<", ">=", ">", "===", "!==", "==", "!=", "&", "|",
        "^", "+", "-", "*", "/", "%", "|>", "<|", "\\>", "\\>>", "<\\", "<<\\"
    ]), join(many(operatorChar)))))));
    (operator = label("Prefix Operator Lexer", either(prefixOperator, infixOperator)));
    (exports["punctuator"] = punctuator);
    (exports["prefixOperator"] = prefixOperator);
    (exports["infixOperator"] = infixOperator);
    (exports["operator"] = operator);
}));