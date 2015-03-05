'use strict';

var fs = require('fs-extra');
var _ = require('lodash');
var async = require('async');
var request = require('request');
var debug = require('debug')('kibana4-backup');
var config = require('../config');
var dump = require('./dump');

module.exports = restore;

function restore(cb) {
  request(config.elasticsearchUrl, function(err, res){
    if(err) return cb(err);
    if(res.statusCode !== 404) {
      debug('Detected .kibana index, skipping restore');
      return cb();
    }
    debug('Restoring everything in backup to .kibana index');
    async.waterfall([
      _.partial(fs.readdir, config.backupDir),
      _.partial(async.reject, function(file){return file === 'README.md';}),
      _.partial(async.each, _, dump, _)
    ], cb);
  });
}