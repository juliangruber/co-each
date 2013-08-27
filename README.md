
# co-each

Parallel forEach for generators.

[![build status](https://secure.travis-ci.org/juliangruber/co-each.png)](http://travis-ci.org/juliangruber/co-each)

## Example

Backup some files:

```js
var each = require('co-each');
var fs = require('fs');
var co = require('co');

co(function* () {
  var files = [
    'index.js', 'README.md'
  ];

  yield each(files, backup);
});

// simple backup function
function backup(path) {
  return function(done) {
    fs.createReadStream(path)
    .pipe(fs.createWriteStream(path + '.bck'))
    .on('error', done)
    .on('close', done);
  };
}
```

## API

### each(arr, fn)

For each element in the Array `arr`, call the generator `fn` with

* the element
* the current index
* the whole array

as in `Array#forEach` and yield when all are done. Functions are being executed
in parallel.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install co-each
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
