'use strict';

//Get, validate, and translate config

var util = require('util');
var path = require('path');
var program = require('commander');
var debug = require('debug')('kibana4-backup');

program
  .version(require('../package.json').version)
  .option('-r, --repo <url>', 'REQUIRED - Git repo to store kibana4 data')
  .option('-s, --elasticsearch-url <url>', 'REQUIRED - Elasticsearch HTTP url you want to target')
  .option('-d, --clone-directory <path>', 'RECOMMENDED - The directory to clone the git repo to. Should be an absolute path, must have write access.', path.resolve(__dirname, '../repo'))
  .option('-e, --environment <env>', 'The environment you want to target.  Alphanumeric only, no whitespace.  Default is "default"', 'default')
  .option('-c, --commit-message <message>', 'Commit message to use when changes are made.  Default is "Backing up %i in %e", where %i is the index and %e is the environment.', 'Backing up %i in %e')
  .option('-i, --index <name>', 'The name of the elasticsearch index you are using for kibana.  Default ".kibana"', '.kibana')
  .parse(process.argv);

if(!program.elasticsearchUrl)
  throw new Error ('-s is a required argument.  It should contain a URL to your elasticsearch HTTP endpoint.');

if (!program.repo)
  throw new Error('-r is required and must be a git url');

if (!isAlphanumeric(program.environment))
  throw new Error('-e must be alphanumeric with no whitespace (0-9, a-z, A-Z)');

var elasticsearchUrl = program.elasticsearchUrl.replace(/\s/g, '%20');
var repoUrl = program.repo.replace(/\s/g, '%20');
var repoName = path.basename(repoUrl, '.git').replace(/%20/g, '_');
var repoDir = path.resolve(program.cloneDirectory, repoName);
var tempDir = path.resolve(program.cloneDirectory, 'temp', program.environment);
var tempFile = path.resolve(tempDir, '.kibana_data');

var config = {
  elasticsearchUrl: util.format('%s/%s/', elasticsearchUrl, program.index),
  tempDir: tempDir,
  backupDir: path.resolve(repoDir, program.environment, 'backup'),
  deployDir: path.resolve(repoDir, program.environment, 'deploy'),
  tempFile: tempFile,
  commitMessage: program.commitMessage.replace(/%e/g, program.environment).replace(/%i/g, program.index),
  repo: repoUrl,
  cloneDir: program.cloneDirectory,
  repoDir: repoDir,
  repoName: repoName,
  index: program.index
};

debug(config);

module.exports = config;

function isAlphanumeric(val) {
  return /^[a-z0-9]+$/i.test(val);
}
