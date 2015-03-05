'use strict';

var path = require('path');
var git = require('simple-git');

module.exports = getLatest;

function getLatest(cb){
  git(path.resolve(__dirname, '..'))
    .checkout('master')
    .pull(cb);
}