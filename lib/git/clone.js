'use strict';

var fs = require('fs-extra');
var async = require('async');
var git = require('simple-git');
var debug = require('debug')('kibana4-backup');
var config = require('../config')();

module.exports = clone;

function clone(cb){
  async.waterfall([
    function(next) {
      fs.stat(config.repoDir, function(err){
        next(null, !!err);
      });
    },
    function(doesNotExist, next) {
      if(doesNotExist || !config.clean)
        return next(null, doesNotExist);
      debug('Repo detected, clean argument specified, deleting repo.');
      fs.remove(config.repoDir, function(err){
        next(err, true);
      });
    },
    function(doesNotExist, next) {
      if(!doesNotExist) {
        debug('Repo detected, skipping clone');
        return next();
      }
      debug('Cloning %s', config.repo);
      git(config.cloneDir).clone(config.repo, config.repoName, next);
    }
  ], cb);
}