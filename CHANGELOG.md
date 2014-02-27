# ChangeLog #

## 0.4.0 - Feb 26, 2014
* Added support for defining immutable and/or non recursive variable declarators.
* Added back syntax `(OP, ARG1)` for currying operators.

## 0.3.0 - Feb 23, 2014
* Added support for rec binding op `:=` plus normal binding op `=:` in let and
  with statements.

## 0.2.0 - Feb 23, 2014
* Fixed curry expression args not always being an array.
* Better error messages for curry expression.

## 0.1.0 - Feb 19, 2014
* Allow self unpack to be any of: array pattern, as pattern, object pattern,
  identifier pattern.

## 0.0.1 - Feb 3, 2014
* Removed use of custom ParserState for parsing
* Removed support for unicode `\\` escaped sequences in identifiers which was
  always lexed to the `\\` punctuator anyways.

## 0.0.0 - Feb 3, 2014
* Fork from main Khepri codebase.