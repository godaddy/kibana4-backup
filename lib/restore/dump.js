'use strict';

var path = require('path');
var _ = require('lodash');
var Elasticdump = require('elasticdump');
var elasticdumpOptions = require('../elasticdump-options');
var config = require('../config')();

module.exports = restoreDump;

function restoreDump(file, cb) {
  if(file === 'README.md')
    return cb();
  var options = _.defaults({
    input: path.resolve(config.backupDir, file),
    output: config.elasticsearchUrl
  }, elasticdumpOptions);
  var dumper = new Elasticdump(options.input, options.output, options);
  dumper.dump(cb);
}