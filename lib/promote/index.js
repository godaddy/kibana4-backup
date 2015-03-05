'use strict';

var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var config = require('../get-config');
var dump = require('./dump');

module.exports = promote;

function promote(cb) {
  if(!config.promoteUrl) return cb();

  async.waterfall([
    _.partial(fs.readdir, config.promoteDir),
    _.partial(async.each, _, dump, _)
  ], cb);
}