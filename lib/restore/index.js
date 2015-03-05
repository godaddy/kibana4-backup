'use strict';

var fs = require('fs');
var async = require('async');
var request = require('request');
var config = require('../get-config');
var dump = require('./dump');

module.exports = restore;

function restore(cb) {
  request(config.elasticsearchUrl, function(err, res){
    if(err) return cb(err);
    if(res.statusCode !== 404) return cb();

    async.each(fs.readdirSync(config.backupDir), dump, cb);
  });
}