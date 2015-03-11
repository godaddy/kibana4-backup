'use strict';

var fs = require('fs');
var git = require('simple-git');
var debug = require('debug')('kibana4-backup');
var config = require('../config')();

module.exports = clone;

function clone(cb){
  fs.stat(config.repoDir, function(err){
    if(err) {
      debug('Cloning %s', config.repo);
      return git(config.cloneDir).clone(config.repo, config.repoName, cb);
    }
    debug('Repo detected, skipping clone');
    return cb();
  });
}