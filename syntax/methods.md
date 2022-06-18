# Methods

## Initialiser

```
InitMethod getExampleFromString(String arg){
    route("/getExample")
    
    request({
        "X-API-KEY": GLOBAL.APIKey,
        "inputString": arg
    })
    
    return<ExampleObject>({
        "message": String,
        @as("someNumbers"){"nums"}: int,
        "isAdmin": bool
    })
}
```
