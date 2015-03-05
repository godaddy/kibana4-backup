'use strict';

var async = require('async');

module.exports = rejectReadme;

function rejectReadme(files, cb) {
  async.reject(files, fileIsReadme, function(result){
    cb(null, result);
  });
}

function fileIsReadme(file, cb) {
  cb(file === 'README.md');
}