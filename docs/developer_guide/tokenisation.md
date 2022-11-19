---
title: Tokenisation
---

# {{ $frontmatter.title }}

After the file is read and stored in memory, the first job of the parsing system is to iterate over all characters/groups of characters and classify them into different token types.
- [Words](#words)
- [Integers](#integers)
- [Booleans](#booleans)
- [String Literals](#string-literals)
- [Encapsulators](#encapsulators)
- [Spliters](#spliters)

## Words
Words can be made up of any ASCII characters from A to z with addition of underscores (`_`), hyphens (`-`) and question marks (`?`) which are joined togeth during tokenisation.

## Integers
Integers are made up of any characters from 0 to 9 and are concatenated and parsed to an unsigned 32bit integer (`u32`) during tokenisation

## Booleans
Booleans or boolean literals represent data that is either true or false, they are created during the word tokenisation process

## String Literals
Represents a string value and is parsed from the characters between a pair of double quotes (`"`)

## Encapsulators
The job of an encapsulator is to enclose different sections of data and can be split into three different types.
- Object/Hashmap encapsulators `{` and `}`
- List/Array encapsulators `[` and `]`
- Function encapsulators `(` and `)`
- Type encapsulators `<` and `>`

## Spliters
Spliters represent a divide in data and come in two types
- Associative spliters `:` used in hashmap data structures
- Index spliters `,` used in lists to seperate items and hashmaps to seperate sets of key value pairs. 
