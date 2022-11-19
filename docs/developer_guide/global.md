---
title: The Global Object
---

# {{ $frontmatter.title }}

The Global object is how objects are created without inheriting data from other objects. This is the object that creates an instance of the library and can store values for use across the entire wrapper such as an API key or authentication tokens.

## Head Route
The head route is the location that all routes are extended from usually the domain of the API. This is used to generate request routes for objects during compile time.
```
headRoute = "https://api.example.com"
// The '/' specifies the head route
localRoute = "/users"
requestRoute = "https://api.example.com/users"
```

## Shape
For API keys and the such you can specify a shape for the values with types. The global object with automatically have setter functions generated for it.

## Methods
Methods specified on the global object are used to generate new objects or if the method doesn't need any data from its parent.

## Syntax
```
Global MyAPI {
    headRoute("https://api.example.com/v2/")

    shape({
        APIKey: String,
        OAuthClientId: String,
        OAuthClientSecret: String
    })
    
    methods([
        
    ])
};
```