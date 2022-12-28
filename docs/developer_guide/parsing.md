---
title: Parsing
---

# {{ $frontmatter.title }}

After finding all the tokens located in a Pendora object or method file, the next part is to parse it into data structures that can be used by the transpiler.

This starts by determining the type of file using the first token in the Vector. It should be a [Word](/developer_guide/tokenisation#words) containing either `Global`, `Object` or `Method`. The remainder of this part of the documentation is dedicated explaining the different parts of the parsing process, in a way that closely maps to `pendora-base` crate.

## Methods
After an initial "sanity check" of the first token, the parser aims to return a data structure like the following:
```rust
pub struct Method {
    pub name: String,
    pub arguments: MethodArguments,
    pub route: String,
    pub request_shape: RequestShape,
    pub request_type: RequestType,
    pub return_shape: ReturnShape,
    pub return_object: String,
}
```
The token after the identifier should be a [Word](/developer_guide/tokenisation#words) containing the name of the method. It then checks if the next token is an open bracket. If so, the parser iterates until it finds a closed bracket and then hands off the captured tokens to `parse_method_arguments()`.
The parser then finds the token between the curly braces (`{}`) and hands it off to `parse_method_internal()` to complete the rest of the Method struct.

### Method Arguments
```rust
pub type MethodArguments = HashMap<String, Type>;
```
To begin, the parser chunks the input array into groups of three.
The first token is destructured as a [Word](/developer_guide/tokenisation#words) with its contents parsed as one of Pendora's internal types using [`parse_type()`](###parse-types).
The second token is destructured as a [Word](/developer_guide/tokenisation#words) and used as the name of the argument.
If the length of the chunk is 3, the third token is destructured as a [Split](/developer_guide/tokenisation#spliters) and checked for a comma (`,`). This allows for trailing commas in the syntax whilst keeping syntax as intended.
This is repeated for all chunks from the input array. 

### Method Internal
```rust
struct MethodInternal {
    route: String,
    request_shape: RequestShape,
    request_type: RequestType,
    return_shape: ReturnShape,
    return_object: String,
}
```
The parser goes through and checks Words and depending on whether it contains `route`, `request` or `return`.

#### Route
This is the simplest to parse. Grab the contents between the brackets (`()`) and destructure it from a [String Literal](/developer_guide/tokenisation#string-literals) to set the route.

#### Request => Request Type
The token between the arrow brackets `< >` is retreived and destructured as a [Word](/developer_guide/tokenisation#words). The contents of the Word is then passed into `parse_request_type()` which matches it to one of the request types.
```rust
pub enum RequestType {
    GET,
    POST,
    PATCH,
    DELETE,
}
```
```rust
"GET" => Ok(RequestType::GET),
"POST" => Ok(RequestType::POST),
"PATCH" => Ok(RequestType::PATCH),
"DELETE" => Ok(RequestType::DELETE),
```
::: warning
Currently very few HTTP request types are avaliable in the language. This is try and help with the process of adding transpiler support for as many languages as possible. For a list of what I'm aiming for, see the [ureq](https://docs.rs/ureq/latest/ureq/index.html) docs for a better idea.
:::

#### Request Shape
```rust
pub type RequestShape = HashMap<String, Value>;
```
Request shape can only be parsed if a preceeding request type has been parsed. After that criteria has been met, the tokens betweenthe brackets are collected and passed to `parse_request_shape()`.
Inside this function, the tokens between the curly braces are collected and chunked into groups of 4.
The first token is destructured as a [Word](/developer_guide/tokenisation#words) and used as the name of the request parameter.
The second token is checked to be a [Split](/developer_guide/tokenisation#spliters) containing a colon (`:`) for syntax accuracy.
The third token is destructured as a [Word](/developer_guide/tokenisation#words) and parsed as into a Value type using [`parse_method_shape_value()`](###parse-value-type).
If the chunk length is 4, the fourth type is checked to be a [Split](/developer_guide/tokenisation#spliters) containing a comma (`,`) for syntax accuracy.
This is repeated for all other chunks.

#### Return => Return Object
The token between the arrow brackets `< >` is retreived and destructured as a [Word](/developer_guide/tokenisation#words) which is set as the return object.

#### Return Shape
```rust
// Option<String> to support parsing aliases
pub type ReturnShape = HashMap<String, Option<String>>;
```
Request shape can only be parsed if a preceeding request type has been parsed. After that criteria has been met, the tokens betweenthe brackets are collected and passed to `parse_return_shape()`.
Inside this function, the tokens between the curly braces are collected and split into groups by where [Splits](/developer_guide/tokenisation#spliters) containing commas (`,`) occur.
If the chunk has only one token, it is destructured as a [Word](/developer_guide/tokenisation#words) with its contents becoming the key and `None` being specified as the value.
If the chunk has 3 tokens, the first token is used the same as before.
Then the second token is checked to be a [Split](/developer_guide/tokenisation#spliters) containing a colon (`:`) for syntax accuracy.
The third token is destructured as a [String Literal](/developer_guide/tokenisation#string-literals) and the value is set as a `Some()` with contents
This is repeated for all other groups.

## Objects
After an initial "sanity check" of the first token, the parser aims to return a data structure like the following:

```rust
pub struct Object {
    pub name: String,
    pub shape: ObjectShape,
    pub methods: Vec<String>,
}
```
The token after the identifier should be a [Word](/developer_guide/tokenisation#words) containing the name of the object.
The tokens captured between the curly braces (`{}`) are destructured as [Words](/developer_guide/tokenisation#words) and compared to `shape` and `methods`.
### Object Shape
```rust
pub type ObjectShape = HashMap<String, Type>;
```
The tokens between the brackets are collected and passed to `parse_object_shape()`.
Inside this function, the tokens between the curly braces are collected and chunked into groups of 4.
The first token is destructured as a [Word](/developer_guide/tokenisation#words) and used as the name of the variable.
The second token is checked to be a [Split](/developer_guide/tokenisation#spliters) containing a colon (`:`) for syntax accuracy.
The third token is destructured as a [Word](/developer_guide/tokenisation#words) and parsed as into a type using [`parse_type()`](###parse-types).
If the chunk length is 4, the fourth type is checked to be a [Split](/developer_guide/tokenisation#spliters) containing a comma (`,`) for syntax accuracy.
This is repeated for all other chunks.

### Methods List
The tokens between the brackets are collected and passed to `parse_object_shape()`.
Inside this function, the tokens between the square brackets (`[]`) are collected and chunked into groups of 2.
The first token is destructured as a [Word](/developer_guide/tokenisation#words) and used as the name of the method.
If the length of the chunk is 2, the second token is destructured as a [Split](/developer_guide/tokenisation#spliters) and checked for a comma (`,`). This allows for trailing commas in the syntax whilst keeping syntax as intended.
This is repeated for all other chunks.
## Global Object
Global Object parsing is almost exactly the same as object parsing. The only difference is the addition of head route.
```rust
pub struct Global {
    pub name: String,
    pub head_route: String,
    pub shape: ObjectShape,
    pub methods: Vec<String>,
}
```
### Head Route
It's as simple as the route parser. 
Grab the contents between the brackets (`()`) and destructure it from a [String Literal](/developer_guide/tokenisation#string-literals) to set the head route.

## Utility Functions
These functions assist in parsing tokens that occur in multiple different structures.
### Parse Types
Matches an input string to a one of Pendora's internal types.
```rust
pub enum Type {
    Integer,
    String,
    Boolean,
    NullableInteger,
    NullableString,
    NullableBoolean,
}
```
```rust
"int" | "Integer" => Ok(Type::Integer),
"bool" | "Boolean" => Ok(Type::Boolean),
"str" | "String" => Ok(Type::String),
"int?" | "Integer?" => Ok(Type::NullableInteger),
"bool?" | "Boolean?" => Ok(Type::NullableBoolean),
"str?" | "String?" => Ok(Type::NullableString),
```

### Parse Value Type
Matches an input string to a Value type.
```rust
pub enum Value {
    Global(String),
    Parent(String),
    Argument(String),
}
```
```rust
fn parse_method_shape_value(input: String) -> Value {
    if input.starts_with("GLOBAL.") {
        let val = input.strip_prefix("GLOBAL.");
        return Value::Global(val.unwrap().to_string());
    } else if input.starts_with("PARENT.") {
        let val = input.strip_prefix("PARENT.");
        return Value::Parent(val.unwrap().to_string());
    } else {
        return Value::Argument(input);
    }
}
```
