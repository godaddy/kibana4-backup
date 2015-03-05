'use strict';

//Get, validate, and translate config

var util = require('util');
var path = require('path');
var program = require('commander');

program
  .version(require('../package.json').version)
  .option('-r, --repo <url>', 'REQUIRED - git repo to store kibana4 data')
  .option('-s, --elasticsearch-url <url>', 'REQUIRED - elasticsearch http url you want to backup')
  .option('-e, --environment <env>', 'the environment you are targetting for backup', alphanumeric, 'default')
  .option('-p, --promote-environment <env>', 'the environment you are targetting for promotion', alphanumeric)
  .option('-t, --promote-url <url>', 'elasticsearch http url you want to target for promote')
  .option('-c, --commit-message <message>', 'commit message to use during backup', 'Backing up %e')
  .parse(process.argv);

if(!program.elasticsearchUrl)
  throw new Error ('-s is a required argument.  It should contain a URL to your elasticsearch HTTP endpoint.');

if (!program.repo)
  throw new Error('-r is required and must be a git url');

var repoName = path.basename(program.repo, '.git');
var repoBaseDir = path.resolve(__dirname, '../repo');
var repoDir = path.resolve(repoBaseDir, repoName);
var tempDir = path.resolve(__dirname, '../temp', program.environment);
var tempFile = path.resolve(tempDir, '.kibana_data');

module.exports = {
  elasticsearchUrl: util.format('%s/.kibana/', program.elasticsearchUrl),
  tempDir: tempDir,
  backupDir: path.resolve(repoDir, program.environment, 'backup'),
  promoteDir: path.resolve(repoDir, program.environment, 'promote'),
  tempFile: tempFile,
  promoteUrl: util.format('%s/.kibana/', program.promoteUrl),
  commitMessage: program.commitMessage.replace(/%e/g, program.environment),
  repo: program.repo,
  repoBaseDir: repoBaseDir,
  repoDir: repoDir,
  repoName: repoName
};

function alphanumeric(val) {
  return /^[a-z0-9]+$/i.test(val);
}
