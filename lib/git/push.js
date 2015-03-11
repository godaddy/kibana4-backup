'use strict';

var git = require('simple-git');
var debug = require('debug')('kibana4-backup');
var config = require('../config')();

module.exports = push;

function push(cb){
  debug('Pushing any changes to %s', config.repo);
  git(config.repoDir).push('origin', 'master', cb);
}