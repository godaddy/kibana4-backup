'use strict';

//Get, validate, and translate config

var util = require('util');
var path = require('path');
var nodeEnv = process.env.NODE_ENV;
var options = require('../options');

if(!nodeEnv || /\s/.test(nodeEnv))
  throw new Error ('NODE_ENV environment must be defined and have no whitespace');

var elasticsearchUrl = options.elasticsearchUrls[nodeEnv];

if(!elasticsearchUrl)
  throw new Error ('options.json does not a url at elasticsearchUrls.[NODE_ENV].  It should contain a URL to your elasticsearch HTTP endpoint.');

var tempDir = path.resolve(__dirname, '../data', nodeEnv, 'temp');
var tempFile = path.resolve(tempDir, '.kibana_data');
var promoteEnvironment = options.promoteMap[nodeEnv];
var promoteUrl = promoteEnvironment ? options.elasticsearchUrls[promoteEnvironment] : undefined;

module.exports = {
  options: options,
  elasticsearchUrl: util.format('%s/.kibana/', elasticsearchUrl),
  nodeEnv: nodeEnv,
  tempDir: tempDir,
  backupDir: path.resolve(__dirname, '../data', nodeEnv, 'backup'),
  promoteDir: path.resolve(__dirname, '../data', nodeEnv, 'promote'),
  tempFile: tempFile,
  promoteUrl: util.format('%s/.kibana/', promoteUrl),
  commitMessage: options.commitMessage.replace(/%e/g, nodeEnv)
};