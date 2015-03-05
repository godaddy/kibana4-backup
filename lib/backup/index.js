'use strict';

var async = require('async');
var saveDataToTemp = require('./save-data-to-temp');
var extractItemsToBackup = require('./extract-items-to-backup');
var saveItems = require('./save-items');

module.exports = backup;

function backup(cb) {
  async.auto({
    saveDataToTemp: saveDataToTemp,
    extractItemsToBackup: ['saveDataToTemp', extractItemsToBackup],
    saveItems: ['extractItemsToBackup', saveItems]
  }, cb);
}