/*
 * THIS FILE IS AUTO GENERATED from 'lib/lex/whitespace_lexer.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/text"], (function(require, exports, __o, __o0) {
    "use strict";
    var map = __o["map"],
        label = __o["label"],
        character = __o0["character"],
        oneOf = __o0["oneOf"],
        match = __o0["match"],
        tab, vt, ff, sp, nbsp, bom, usp, whitespace, tabChar = "\t",
        vtChar = "\u000b",
        ffChar = "\f",
        spChar = " ",
        nbspChar = " ",
        bomChar = "﻿";
    (tab = character(tabChar));
    (vt = character(vtChar));
    (ff = character(ffChar));
    (sp = character(spChar));
    (nbsp = character(nbspChar));
    (bom = character(bomChar));
    (usp = match(/^\s$/));
    (whitespace = label("Whitespace Character Lexer", oneOf([tabChar, vtChar, ffChar, spChar, nbspChar, bomChar])));
    (exports["tab"] = tab);
    (exports["vt"] = vt);
    (exports["ff"] = ff);
    (exports["sp"] = sp);
    (exports["nbsp"] = nbsp);
    (exports["bom"] = bom);
    (exports["usp"] = usp);
    (exports["whitespace"] = whitespace);
}));