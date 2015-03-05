'use strict';

var _ = require('lodash');
var async = require('async');
var fs = require('fs-extra');
var debug = require('debug')('kibana4-backup');
var config = require('./lib/config');
var clone = require('./lib/git/clone');
var getLatest = require('./lib/git/get-latest');
var createDirectories = require('./lib/create-directories');
var createReadmes = require('./lib/readmes/create');
var restore = require('./lib/restore');
var deploy = require('./lib/deploy');
var backup = require('./lib/backup');
var commit = require('./lib/git/commit');

module.exports = kibana4Backup;

function kibana4Backup(cb){
  debug('Starting kibana4 backup');
  async.series([
    _.partial(fs.mkdirs, config.repoBaseDir),
    clone,
    getLatest,
    createDirectories,
    createReadmes,
    restore,
    deploy,
    backup,
    commit
  ], function(err, results){
    if(err) {
      console.error(err);
      return cb(new Error('kibana4-backup failed'));
    }
    debug(results);
    console.log('kibana4-backup complete');
    cb();
  });
}