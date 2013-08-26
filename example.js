
var each = require('./');
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
