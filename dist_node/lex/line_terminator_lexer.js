/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/line_terminator_lexer.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bennu")["parse"],
    always = __o["always"],
    choice = __o["choice"],
    next = __o["next"],
    optional = __o["optional"],
    label = __o["label"],
    token = __o["token"],
    __o0 = require("bennu")["text"],
    character = __o0["character"],
    oneOf = __o0["oneOf"],
    lf, cr, ls, ps, lineTerminator, lineTerminatorSequence;
(lf = label("Line Feed Lexer", character("\n")));
(cr = label("Carriage Return Lexer", character("\r")));
(ls = label("Line Separator Lexer", character("\u2028")));
(ps = label("Paragraph Separator Lexer", character("\u2029")));
(lineTerminator = label("Line Terminator Lexer", oneOf(["\n", "\r", "\u2028", "\u2029"])));
(lineTerminatorSequence = label("Line Terminator Sequence Lexer", choice(lf, ls, ps, next(cr, optional("\r", next(lf,
    always("\r\n")))))));
(exports["lf"] = lf);
(exports["cr"] = cr);
(exports["ls"] = ls);
(exports["ps"] = ps);
(exports["lineTerminator"] = lineTerminator);
(exports["lineTerminatorSequence"] = lineTerminatorSequence);