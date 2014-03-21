/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lex/line_terminator_lexer.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bennu/parse", "bennu/text"], (function(require, exports, __o, __o0) {
    "use strict";
    var always = __o["always"],
        choice = __o["choice"],
        next = __o["next"],
        optional = __o["optional"],
        label = __o["label"],
        token = __o["token"],
        character = __o0["character"],
        oneOf = __o0["oneOf"],
        lf, cr, ls, ps, lineTerminator, lineTerminatorSequence, lfChar = "\n",
        crChar = "\r",
        lsChar = "\u2028",
        psChar = "\u2029";
    (lf = label("Line Feed Lexer", character(lfChar)));
    (cr = label("Carriage Return Lexer", character(crChar)));
    (ls = label("Line Separator Lexer", character(lsChar)));
    (ps = label("Paragraph Separator Lexer", character(psChar)));
    (lineTerminator = label("Line Terminator Lexer", oneOf([lfChar, crChar, lsChar, psChar])));
    (lineTerminatorSequence = label("Line Terminator Sequence Lexer", choice(lf, ls, ps, next(cr, optional(
        crChar, next(lf, always((crChar + lfChar))))))));
    (exports["lf"] = lf);
    (exports["cr"] = cr);
    (exports["ls"] = ls);
    (exports["ps"] = ps);
    (exports["lineTerminator"] = lineTerminator);
    (exports["lineTerminatorSequence"] = lineTerminatorSequence);
}));