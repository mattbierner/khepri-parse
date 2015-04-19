# ChangeLog #

## 2.7.2 - April 19, 2015
* Fixed object pattern operator key.

## 2.7.1 - December 2, 2014
* Fixed xregexp path on systems with case sensitive file names. (Thanks @geluspeculum)

## 2.7.0 - Sep 30, 2014
* Delete expressions parsed to `DeleteExpression` instead of `UnaryExpressions`.

## 2.6.0 - Sep 22, 2014
* Added `<<|` and `|>>` ops.

## 2.5.0 - Sep 18, 2014
* Improved unicode support for identifiers and whitespace.
* Package exports can use `#` to alias exports.
* Package export aliases may be identifies.
* Functions may use `with` or `try` statements as their body.
** `\x -> with import 'math' add in { return x + add(1, 2); }`

## 2.4.5 - Sep 9, 2014
* Fixed `??` lexed as puctuator instead of operator.
* Fixed `(??, 1)` needing comma.

## 2.4.2 - Sep 8, 2014
* Ensure that `(.x);` and `.x`; are parsed the same way.

## 2.4.1 - Sep 8, 2014
* Dot expression as `OperatorExpressions` instead of `UnaryExpressions` which imply
  application.

## 2.4.0 - Sep 8, 2014
* Removed checked object accessor expression in favor of the more
  general `??` operator.
* Added support for dot expressions.
** `.a.b.c` is a unary function that does `x.a.b.c`.

## 2.3.1 - Sep 7, 2014
* Fixed checked object expression patterns.
* Allow `.?` as unary op.

## 2.3.0 - Sep 7, 2014
* Passing of checked array and object patterns `\?{a b}`.
* Parsing of checked member expressions `a.?b` `a.?(1)`.
* Deprecation of `\{'a':b}` pattern syntax in favor of `\{'a'#b}`.

## 2.2.0 - May 14, 2014
* Updated to khepri-ast V4.4

## 2.1.3 - May 13, 2014
* Fixed infix operators extending puctuators like `->-` lexed incorrectly.

## 2.1.2 - May 13, 2014
* Fixed infix ops `!=` getting lexed as prefix ops.

## 2.1.1 - May 7, 2014
* Fixed args unpack parser to work with new tokens.

## 2.1.0 - May 7, 2014
* Lex stream generates `PrefixOperator` and `InfixOperator` tokens instead of the
  generic `Operator` and using the parser for prefix and infix determination.

## 2.0.0 - May 6, 2014
* Fixed op to function of `void`.
* Added support for custom prefix unary and infix binary operators
* Can be used in variable declarations, package exports, and unpacks.
** Operators inherit precedence from their prefix op `1 +? 2 *> 3` is `(1 +? (2 *> 3));`
** Parsing and lexing have no knowledge of what ops are actually defined so will
  merge unary ops. The compiler can then split merged unary ops.
* Changed argument unpack syntax to require a prefixed `-`. `\-args(x ...)-> ...`
** Allows the parser to produce better error messages and support operators in the
  parameter list `\(+) -> 1 + 2;`
* Removed the not very useful unary operator curry syntax.
* Allow a curried binary operator to omit the comma for the argument in most cases.
** The two exceptions being `(new, x)` and `(., x)`;

## 1.1.0 - May 5, 2014
* Added support for tracking file names in source locations during lexing.

## 1.0.0 - April 15, 2014
* Restrict delete to only delete member references.

## 0.12.0 - April 10, 2014
* Currying of non-computed member accessor
* Restored support for number and identifier keys on object literals now language
  is more stable.
* Added `:=` assignment operator for immutable assignments.

## 0.11.4 - April 9, 2014
* Fixed assignment pattern not setting op correctly.

## 0.11.3 - April 9, 2014
* Fixed failing of ellipsis followed by comma in args pattern.

## 0.11.2 - April 8, 2014
* Restored ability to have ellipsis without an identifier.

## 0.11.0 - April 7, 2014
* Allow lambdas to limit their capture using `§`.
* Added support for parsing array and argument unpacks with ellipsis unpacks.

## 0.9.1 - March 24, 2014
* Fixed `BinaryOperatorExpression` creating nodes with tokens as `op` instead of
  actual op as string.

## 0.9.0 - March 24, 2014
* Allow operator to function of binary `new` and `@` operators.
* Added flipped binary operator to function syntax. `(_/, 10)`.

## 0.8.0 - March 20, 2014
* Changed composed associativity to match the order the functions are evaluated in.
* Fixed forms `f (+)` and `f @ (+)`.

## 0.7.1 - March 19, 2014
* Fixed new applications not creating an array for single arg.

## 0.7.0 - March 18, 2014
* `.` `<|` `|>`, and composes as valid binary operator expressions.
* new expressions can be used without parens: `new Parser\...->...`.
* Allow left hand side of assignment expression to be chained: `x = y = 3` as
  long as the lhs or each expressions is a reference expression.
* Improved error messaging and performance.

## 0.6.2 - March 6, 2014
* Update to Bennu 17.

## 0.6.0 - March 5, 2014
* Added do expression parsing.

## 0.5.1 - March 4, 2014
* Reversed alias and Id on package export.

## 0.5.0 - March 4, 2014
* Added package export alias support.
* Added module exports package support.

## 0.4.1 - Feb 26, 2014
* Fixed booleans getting lexed to identifiers.

## 0.4.0 - Feb 26, 2014
* Added support for defining immutable and/or non recursive variable declarators.
* Added back syntax `(OP, ARG1)` for currying operators.
* Move `position.kep` file to khepri-ast.

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