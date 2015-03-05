'use strict';

var path = require('path');
var fs = require('fs');
var async = require('async');
var config = require('../get-config');

module.exports = saveItems;

function saveItems(cb, results) {
  async.each(results.extractItemsToBackup, function(item, eachCb){
    console.log(item);
    var itemPath = path.resolve(config.backupDir, item._id);
    fs.writeFile(itemPath, JSON.stringify(item), eachCb);
  }, cb);
}