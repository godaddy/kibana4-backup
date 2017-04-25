'use strict';

var async = require('async');

module.exports = rejectReadme;

function rejectReadme(files, cb) {
  async.reject(files, fileIsReadme, function(err, result){
    cb(null, result || []);
  });
}

function fileIsReadme(file, cb) {
  cb(null, file === 'README.md');
}