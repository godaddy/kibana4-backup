'use strict';

var _ = require('lodash');
var async = require('async');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var config = require('./get-config');

module.exports = clearPromoteDirectory;

function clearPromoteDirectory(cb) {
  async.series([
    _.partial(rimraf, config.promoteDir),
    _.partial(mkdirp, config.promoteDir)
  ], cb);
}