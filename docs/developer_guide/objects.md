---
title: Objects
---

# {{ $frontmatter.title }}

Pendora's main facet is objects. These store information from a web request and allow developers to access this in a format that you choose.

## Shape
Shape describes how an object is internally structured. All values in an object should be strongly and statically typed by default. The nullable operator allows a value to be returned to the wrapper as null or not be returned at all. Type can also be set to any but it is preferred that this isn't done.

## Syntax
```
Object ExampleObject {
    shape({
        message: string,
        someNumbers: int?,
        isAdmin: bool
    })
    
    methods([

    ])
};
```