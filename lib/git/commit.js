'use strict';

var git = require('simple-git');
var debug = require('debug')('kibana4-backup');
var config = require('../config');
var cbOnError = require('./cb-on-error');

module.exports = commit;

function commit(cb){
  debug('Commiting changes to %s', config.repo);
  git(config.repoDir)
    .pull()
    .add('--a')
    .commit(config.commitMessage, cbOnError(cb))
    .push('origin', 'master', cb);
}