---
title: Introduction
---

# {{ $frontmatter.title }}

Hey folks, welcome to the documentation about how Pendora itself works, better known internally as the `impl` docs. 

This version of the documentation is designed to explain how the language is structured and how it all of its parts come together under the hood.
The compiler is designed to be extensible to be ported to different language targets.

## Languages to implement
- Primary targets
    - Rust
    - Python
    - Typescript
        ::: details Why not JS?
        Typescript has been selected over Javascript for a few reasons. TS supports strong type definitions and conventions, whislt JS doesn't.
        Most developers prefer TS over JS for this reason plus the Intellisense. Pendora's ethos is to allow developers to be in charge of aspects 
        such as file compression and formatting, and TS can be transpiled into any other flavour of ES using tsc.
        :::
    - Java
    - Go
- Considering
    - Kotlin
    - C/C++
    - C#
    - Perl
    - Ruby
- Will only receive a compiler if I'm really bored
    - Haskell
