'use strict';

var git = require('simple-git');
var debug = require('debug')('kibana4-backup');
var config = require('../config')();

module.exports = checkout;

function checkout(sha1, cb){
  debug('Checking out sha1 %s', sha1);
  git(config.repoDir).checkout(sha1, cb);
}