'use strict';

var async = require('async');
var debug = require('debug')('kibana4-backup');
var clearExistingTemp = require('./clear-existing-temp');
var saveDataToTemp = require('./save-data-to-temp');
var extractItemsToBackup = require('./extract-items-to-backup');
var saveItems = require('./save-items');

module.exports = backup;

function backup(cb) {
  debug('Starting backup');
  async.auto({
    clearExistingTemp: clearExistingTemp,
    saveDataToTemp: ['clearExistingTemp', saveDataToTemp],
    extractItemsToBackup: ['saveDataToTemp', extractItemsToBackup],
    saveItems: ['extractItemsToBackup', saveItems]
  }, cb);
}