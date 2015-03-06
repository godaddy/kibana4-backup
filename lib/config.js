'use strict';

//Get, validate, and translate config

var util = require('util');
var path = require('path');
var program = require('commander');
var debug = require('debug')('kibana4-backup');

program
  .version(require('../package.json').version)
  .option('-r, --repo <url>', 'REQUIRED - git repo to store kibana4 data')
  .option('-s, --elasticsearch-url <url>', 'REQUIRED - elasticsearch http url you want to target')
  .option('-d, --clone-directory <path>', 'RECOMMENDED - the directory to clone the git repo to, should be an absolute path, must have write access', path.resolve(__dirname, '../repo'))
  .option('-e, --environment <env>', 'the environment you want to target', alphanumeric, 'default')
  .option('-c, --commit-message <message>', 'commit message to use when changes are made', 'Backing up %e')
  .parse(process.argv);

if(!program.elasticsearchUrl)
  throw new Error ('-s is a required argument.  It should contain a URL to your elasticsearch HTTP endpoint.');

if (!program.repo)
  throw new Error('-r is required and must be a git url');

var elasticsearchUrl = program.elasticsearchUrl.replace(/\s/g, '%20');
var repoUrl = program.repo.replace(/\s/g, '%20');
var repoName = path.basename(repoUrl, '.git').replace(/%20/g, '_');
var repoDir = path.resolve(program.cloneDirectory, repoName);
var tempDir = path.resolve(program.cloneDirectory, 'temp', program.environment);
var tempFile = path.resolve(tempDir, '.kibana_data');

var config = {
  elasticsearchUrl: util.format('%s/.kibana/', elasticsearchUrl),
  tempDir: tempDir,
  backupDir: path.resolve(repoDir, program.environment, 'backup'),
  deployDir: path.resolve(repoDir, program.environment, 'deploy'),
  tempFile: tempFile,
  commitMessage: program.commitMessage.replace(/%e/g, program.environment),
  repo: repoUrl,
  cloneDir: program.cloneDirectory,
  repoDir: repoDir,
  repoName: repoName
};

debug(config);

module.exports = config;

function alphanumeric(val) {
  return /^[a-z0-9]+$/i.test(val);
}
