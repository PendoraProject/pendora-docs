# The Global Object

The Global object is how objects are created without inheriting data from other objects. This is the object that creates an instance of the library and can store values for use across the entire wrapper such as an API key or authentication tokens.

## Internal Values

Some values are required for use and will be automatically implemented during compile time.

### Head Route

The head route is the location that all routes are extended from usually the domain of the API.

```

headRoute = "https://api.example.com"
// The '/' specifies the head route
localRoute = "/users"
requestRoute = "https://api.example.com/users"

```

### Keys

For API keys and the such you can specify a shape for the values with types. The global object with automatically have setter functions generated for it.
