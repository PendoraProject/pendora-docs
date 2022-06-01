# Objects

Pendora's main facet is objects. These store information from a web request and allow developers to access this in a format that you choose.

## Shape

Shape describes how an object is internally structured. All values in an object should be strongly and statically typed by default. The nullable operator allows a value to be returned to the wrapper as null or not be returned at all. Type can also be set to any but it is preferred that this isn't done.

## Methods

Methods are how you create and interact with objects. They can be passed arguments and access data from their parent object. Methods can also be defined outside of objects to be used by multiple objects through inheritance.

### Initialisers

Initialisers are any method that creates an object. These require a route to access information from the correct location in the API and any parameters that need to be sent with the request which can be from arguments, the parent object and/or the [Global](the-global-object.md) object. The return shape defines what Pendora expects to receive from the request and how to structure this in to an object.

### Mutations

Mutation methods refer to anything that sends a request to change some information on the API. Mutations **DO NOT** change the state of the object they are called on, but an initialiser can be specified as a refresh method which will cause it to return a new object with the updated data.
