# jsonrefs
Resolves "_ref" references in JS object to JSON files

## Usage
```shell
npm install --save jsonrefs
```

test.json:
```JSON
{
    "one": 1,
    "two": 2, 
    "object": {
        "child": {
            "_ref": "other.json"
        }
    }
}
```

other.json:
```JSON
{
    "filename": "other.json",
    "this": "is",
    "a": "test"
}
```

use jsonrefs:
```JavaScript
var jsonref = require('jsonrefs');

jsonref.parse(require('../jsonrefs/test.json'));
```

result:
```JSON
{ 
    "one": 1,
    "two": 2,
    "object": { 
        "child": { 
            "filename": "other.json",
            "this": "is",
            "a": "test",
            "_oldref": "other.json" 
        } 
    } 
}
```
