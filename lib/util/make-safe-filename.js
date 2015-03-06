'use strict';

var sanitize = require('sanitize-filename');

module.exports = makeSafeFilename;

// There are situations where we can't just sanitize a filename, because
// it only contains invalid characters (so sanitization would result in an 
// empty string).  As an alternative approach, this funciton will base64 
// encode the filename and remove any invalid characters (/)

function makeSafeFilename(file) {
  return sanitize(file) || new Buffer(file).toString('base64').replace(/\//g, '');
}