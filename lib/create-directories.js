'use strict';

var _ = require('lodash');
var debug = require('debug')('kibana4-backup');
var async = require('async');
var fs = require('fs-extra');
var config = require('./config')();

module.exports = createDirectories;

function createDirectories(cb) {
  debug('Creating directories if they do not already exist');
  async.parallel([
    _.partial(fs.mkdirs, config.tempDir),
    _.partial(fs.mkdirs, config.backupDir),
    _.partial(fs.mkdirs, config.deployDir)
  ], cb);
}
