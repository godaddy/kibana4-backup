'use strict';

var async = require('async');
var createDirectories = require('./lib/create-directories');
var getLatest = require('./lib/get-latest');
var restore = require('./lib/restore');
var promote = require('./lib/promote');
var clearPromoteDirectory = require('./lib/clear-promote-directory');
var backup = require('./lib/backup');
var commit = require('./lib/commit');

module.exports = kibana4Backup;

function kibana4Backup(cb){
  async.series([
    getLatest,
    createDirectories,
    restore,
    promote,
    clearPromoteDirectory,
    backup,
    commit
  ], cb);
}