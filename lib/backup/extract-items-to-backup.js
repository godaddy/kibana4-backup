'use strict';

var _ = require('lodash');
var readline = require ('readline');
var fs = require('fs');
var debug = require('debug')('kibana4-backup');
var config = require('../config')();
var typesToExtract = [
  'config',
  'index-pattern',
  'dashboard',
  'visualization',
  'search'
];

module.exports = extractItemsToBackup;

function extractItemsToBackup(results, cb) {
  debug('Extracting items to backup');
  var rl = readline.createInterface({
    input: fs.createReadStream(config.tempFile)
  });
  var itemsToBackup = [];
  rl.on('line', function (line) {
    var item = JSON.parse(line);
    if (_.includes(typesToExtract, item._type)) {
      itemsToBackup.push(item);
    }
  });
  rl.on('close', function () {
    cb(null, itemsToBackup);
  });
}