'use strict';

var util = require('util');
var crypto = require('crypto');
var sanitize = require('sanitize-filename');

module.exports = makeSafeFilename;

// Kibana item ids are case sensitive, i.e. blah and BLAH are two different ids.
// OSX's file system is case insensitive, which can cause issues when you want to
// clone the sync repo and play with the backup files.  We create an md5 checksum
// of the item id to get a case insensitive id and append that to the end of the
// filename to make OSX users happy.

function makeSafeFilename(item) {
  var checksum = crypto.createHash('md5');
  checksum.update(item._id);
  var hexId = checksum.digest('hex');
  var filename = util.format('%s_%s_%s', item._type, item._id, hexId);
  return sanitize(filename);
}