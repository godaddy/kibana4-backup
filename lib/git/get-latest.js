'use strict';

var git = require('simple-git');
var debug = require('debug')('kibana4-backup');
var config = require('../config')();

module.exports = getLatest;

function getLatest(cb){
  debug('Checking out master and getting latest from %s', config.repoName);
  git(config.repoDir)
    .checkout('master')
    .pull(cb);
}