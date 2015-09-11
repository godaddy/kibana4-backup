'use strict';

var fs = require('fs-extra');
var _ = require('lodash');
var async = require('async');
var request = require('request');
var debug = require('debug')('kibana4-backup');
var config = require('../config')();
var dump = require('./dump');
var rejectReadme = require('../util/reject-readme');
var checkout = require('../git/checkout');

module.exports = restore;

function restore(cb) {
  request(config.elasticsearchUrl, function(err, res){
    if(err) return cb(err);
    if(res.statusCode !== 404 && !config.restoreSha1) {
      debug('Detected .kibana index, skipping restore');
      return cb();
    }
    if(config.restoreSha1)
      return restoreSha1(cb);
    return restoreBackupDir(cb);
  });
}

function restoreSha1(cb) {
  debug('Detected --restore-sha1, restoring %s', config.restoreSha1);
  async.waterfall([
    _.partial(checkout, config.restoreSha1),
    restoreBackupDir,
    _.partial(checkout, 'master')
  ], cb);
}

function restoreBackupDir(cb) {
  debug('Restoring everything in backup to .kibana index');
  async.waterfall([
    _.partial(fs.readdir, config.backupDir),
    rejectReadme,
    _.partial(async.each, _, dump, _)
  ], cb);
}
