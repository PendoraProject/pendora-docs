---
title: Lexing
---

# {{ $frontmatter.title }}

After the file is read and stored in memory, the first job of the parsing system is to iterate over all characters and group them into one of three types.
- Characters
- Encapsulators
- Numbers
- Spliters
- Whitespace

## Characters
A character is any ASCII value between A and z plus `?` and `.`. 

## Encapsulators
The job of an encapsulator is to enclose different sections of data and can be split into four different types.
- Object encapsulators `{` and `}`
- Function encapsulators `(` and `)`
- Type encapsulators `<` and `>`
- String encapsulators `"`

## Numbers
Numbers are made up of any characters from 0 to 9 and are concatenated and parsed to an integer value during Lexing

## Spliters
Spliters represent a divide in data and come in two types
- Associative spliters `:`
- Index spliters `,`

## Whitespaces
Spaces...