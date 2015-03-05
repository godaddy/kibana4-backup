'use strict';

var _ = require('lodash');
var async = require('async');
var mkdirp = require('mkdirp');
var config = require('./get-config');

module.exports = createDirectories;

function createDirectories(cb) {
  async.parallel([
    _.partial(mkdirp, config.tempDir),
    _.partial(mkdirp, config.backupDir),
    _.partial(mkdirp, config.promoteDir)
  ], cb);
}
