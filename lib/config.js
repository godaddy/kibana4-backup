'use strict';

//Get, validate, and translate config

var util = require('util');
var path = require('path');
var _ = require('lodash');
var debug = require('debug')('kibana4-backup');

var options;
var defaultOptions = {
  cloneDirectory: path.resolve(__dirname, '../repo'),
  environment: 'default',
  commitMessage: 'Backing up %i in %e',
  index: '.kibana',
  clean: false,
  restoreSha1: null
};
var config;

module.exports = getConfig;

//First call of getConfig requires options to be passed.
//Options will be cached after first call.
function getConfig(newOptions) {
  if(newOptions) {
    options = newOptions;
    config = null;
  }
  if(config)
    return config;
  
  _.defaults(options, defaultOptions);

  if(!options)
    throw new Error ('You have called getConfig without options, first call must pass options.');
  if(!options.elasticsearchUrl)
    throw new Error ('-s is a required argument.  It should contain a URL to your elasticsearch HTTP endpoint.');
  if (!options.repo)
    throw new Error('-r is required and must be a git url');
  if (!isAlphanumeric(options.environment))
    throw new Error('-e must be alphanumeric with no whitespace (0-9, a-z, A-Z)');

  var elasticsearchUrl = options.elasticsearchUrl.replace(/\s/g, '%20');
  var repoUrl = options.repo.replace(/\s/g, '%20');
  var repoName = path.basename(repoUrl, '.git').replace(/%20/g, '_');
  var repoDir = path.resolve(options.cloneDirectory, repoName);
  var tempDir = path.resolve(options.cloneDirectory, 'temp', repoName, options.environment);
  var tempFile = path.resolve(tempDir, '.kibana_data');
  var newConfig = {
    elasticsearchUrl: util.format('%s/%s/', elasticsearchUrl, options.index),
    tempDir: tempDir,
    backupDir: path.resolve(repoDir, options.environment, 'backup'),
    deployDir: path.resolve(repoDir, options.environment, 'deploy'),
    tempFile: tempFile,
    commitMessage: options.commitMessage.replace(/%e/g, options.environment).replace(/%i/g, options.index),
    repo: repoUrl,
    cloneDir: options.cloneDirectory,
    repoDir: repoDir,
    repoName: repoName,
    index: options.index,
    clean: options.clean,
    restoreSha1: options.restoreSha1
  };
  debug(newConfig);
  config = newConfig;
  return newConfig;
}

function isAlphanumeric(val) {
  return /^[a-z0-9_\-]+$/i.test(val);
}
