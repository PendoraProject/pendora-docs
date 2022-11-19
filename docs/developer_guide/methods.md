---
title: Methods
---

# {{ $frontmatter.title }}

Methods are part of Pendora designed to describe HTTP requests, they create objects from return values and can be used to update data serverside.

## Arguments
Arguments for a method to require at compile time can included in brackets next to the method name, following the format of "Type argument_name" and seperated by commas.

## Route
The route describes the URI the request will be sent to. A route by default will be absolute but can be made relative to the head route by placing a backslash at the start of the string.

## Request
::: warning
Pendora will use JSON for its request format. This may be adjustable in the Pendorafile in later iterations as an experimental feature. Please double check your API complies.
:::
### Request Shape
The request shape is the data that will sent to the request route. It can borrow values from the method's arguments, parent and the global object.
```
my_arg // refers to a method argument
PARENT.some_data // refers to a value on the parent object
GLOBAL.X-API-KEY // refer to a value on the global object
```
### Request Type
Request type is specified between triangle brackets (Less-than and greater-than signs) and can be one of four types;
- GET
- POST
- PATCH
- DELETE

## Return
Describes how the information received from a web request should be fitted into an object
### Return Shape
::: warning
Pendora will use JSON when interpreting web requests. This may be adjustable in the Pendorafile in later iterations as an experimental feature. Please double check your API complies.
:::
The return shape works by pairing the value of an object (left side), with the values of the returned request data (right side). Since the value names in objects will likely be the same as the value names of the request, syntactic sugar has been added to facilitate this common occurence.
```
// These lines of code do the same thing
message: "message",
message,
```
### Return Type
Specifies which type of object the data is meant to be fitted to and is placed between triangle brackets (Less-than and greater-than signs).

## Syntax
```
Method getExampleFromString(String arg){
    route("/getExample")
    
    request<GET>({
        X-API-KEY: GLOBAL.APIKey,
        someData: PARENT.some_data,
        inputString: arg
    })
    
    return<ExampleObject>({
        message,
        someNumbers: "nums",
        isAdmin
    })
};
```
