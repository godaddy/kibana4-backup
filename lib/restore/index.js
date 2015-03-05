'use strict';

var fs = require('fs-extra');
var _ = require('lodash');
var async = require('async');
var request = require('request');
var debug = require('debug')('kibana4-backup');
var config = require('../config');
var dump = require('./dump');
var rejectReadme = require('../util/reject-readme');

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
      rejectReadme,
      _.partial(async.each, _, dump, _)
    ], cb);
  });
}