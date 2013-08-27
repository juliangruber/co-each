
var test = require('tape');
var each = require('./');
var co = require('co');
var fs = require('fs');

test('args', function(t) {
  co(function*() {
    t.plan(9);
    var arr = [0, 1, 2];
    var i = 0;
    yield each(arr, function*(el, j, all) {
      t.equal(el, i);
      t.equal(j, i);
      t.deepEqual(all, arr);
      i++;
    });
  });
});

test('backup', function(t) {
  co(function*() {
    t.plan(2);

    var files = [
      'index.js', 'README.md'
    ];

    yield each(files, backup);
    t.equal(yield read('index.js'), yield read('index.js.bck'));
    t.equal(yield read('README.md'), yield read('README.md.bck'));
  });
});

function read(path) {
  return function(done) {
    fs.readFile(path, 'utf8', done);
  }
}

function backup(path) {
  return function(done) {
    fs.createReadStream(path)
    .pipe(fs.createWriteStream(path + '.bck'))
    .on('error', done)
    .on('close', done);
  };
}
