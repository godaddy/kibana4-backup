'use strict';

var path = require('path');
var fs = require('fs');
var async = require('async');
var debug = require('debug')('kibana4-backup');
var makeSafeFilename = require('../util/make-safe-filename');
var config = require('../config')();

module.exports = saveItems;

function saveItems(results, cb) {
  debug('Saving items to backup directory');
  async.each(results.extractItemsToBackup, function(item, eachCb){
    var itemName = makeSafeFilename(item);
    var itemPath = path.resolve(config.backupDir, itemName);
    fs.writeFile(itemPath, JSON.stringify(item), eachCb);
  }, cb);
}