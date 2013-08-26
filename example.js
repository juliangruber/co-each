
var each = require('./');
var fs = require('fs');
var co = require('co');

var files = [
  'index.js', 'README.md'
];

co(function* () {
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
