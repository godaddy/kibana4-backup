'use strict';

var _ = require('lodash');
var fs = require('fs');
var config = require('../get-config');
var typesToExtract = [
  'config',
  'index-pattern',
  'dashboard',
  'visualization',
  'search'
];

module.exports = extractItemsToBackup;

function extractItemsToBackup(cb) {
  fs.readFile(config.tempFile, 'utf-8', function(err, data){
    if(err) return cb(err);

    var items = JSON.parse(data);
    var itemsToBackup = _.filter(items, function(item){
      return _.includes(typesToExtract, item._type);
    });
    cb(null, itemsToBackup);
  });
}