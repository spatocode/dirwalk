# dirwalk

Directory tree traversal in nodejs

## Installation

```sh
$ npm install dirwalk
```

## Usage


```js
const dirwalk = require("dirwalk");

// Asynchronous function
dirwalk.walk("path/to/dir", (err, path, info) => {
    if (err) {
        throw err;
    }
    console.log(path, " : ", info.size);
});

// Synchronous function
var files = dirwalk.walkSync("path/to/dir");
console.log(files);
```

## License

[MIT License](http://www.github.com/spatocode/dirwalk/blob/master/LICENSE)
Copyright (c) 2019 Ekene Izukanne
