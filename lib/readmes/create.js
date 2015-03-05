'use strict';

var path = require('path');
var _ = require('lodash');
var async = require('async');
var fs = require('fs-extra');
var debug = require('debug')('kibana4-backup');
var config = require('../config');

module.exports = createReadmes;

function createReadmes(cb) {
  debug('Creating READMEs in backup and promote directories');
  async.series([
    _.partial(fs.copy, 
      path.resolve(__dirname, 'BACKUP_README.md'), 
      path.resolve(config.backupDir, 'README.md')),
    _.partial(fs.copy, 
      path.resolve(__dirname, 'PROMOTE_README.md'), 
      path.resolve(config.promoteDir, 'README.md'))
  ], cb);
}
