'use strict';

var path = require('path');
var git = require('simple-git');
var config = require('./get-config');

module.exports = commit;

function commit(cb){
  git(path.resolve(__dirname, '..'))
    .pull()
    .add('./*')
    .commit(config.commitMessage)
    .push('origin', 'master', cb);
}