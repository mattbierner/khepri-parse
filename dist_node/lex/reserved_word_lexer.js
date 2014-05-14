/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/reserved_word_lexer.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    __o0 = require("bennu")["text"],
    reservedWordList, reservedWord, label = __o["label"],
    trie = __o0["trie"],
    keywordList = ["break", "case", "catch", "continue", "debugger", "default", "delete", "do", "else", "finally",
        "for", "function", "if", "in", "instanceof", "typeof", "new", "var", "return", "void", "switch", "while",
        "this", "with", "throw", "try", "export", "package", "class", "enum", "interface", "extends", "implements",
        "private", "public", "protected", "super", "const", "yield", "import", "let", "static", "_"
    ];
(reservedWordList = keywordList.concat("null", "true", "false"));
(reservedWord = label("ReservedWordLexer", trie(reservedWordList)));
(exports["reservedWordList"] = reservedWordList);
(exports["reservedWord"] = reservedWord);