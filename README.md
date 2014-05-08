# Khepri-parse

Parser and lexer for the [Khepri][khepri] programming language.

A library of [Bennu] parsers.

### Usage
The main high level library interface is the `lex` and `parse` functions:

```
with
    import 'khepri-parse::lex::lexer' {lex},
    import 'khepri-parse::parse::parser' {parseStream}
{
    // `lex` takes a character array and produces a token Nu stream.
    // `parseStream` takes a lazy stream of tokens and outputs an AST.
    "\x -> x;"
        |> lex
        |> parseStream;
}
```

Individual [Bennu][bennu] parses may also be consumed:

```
with
    import 'khepri-parse::lex::number_lexer' {numericLiteral},
    import 'bennu::parse' {many run}
{
    var program := many numericLiteral;
    run(program, "1 2e3 3.03");
}
```


[khepri]: http://khepri-lang.com
[bennu]: https://github.com/mattbierner/bennu