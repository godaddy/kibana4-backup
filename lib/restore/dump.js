'use strict';

var path = require('path');
var _ = require('lodash');
var Elasticdump = require('elasticdump').elasticdump;
var elasticdumpOptions = require('../elasticdump-options');
var config = require('../get-config');

module.exports = restoreDump;

function restoreDump(file, cb) {
  var options = _.defaults({
    input: path.resolve(config.backupDir, file),
    output: config.elasticsearchUrl
  }, elasticdumpOptions);
  var dumper = new Elasticdump(options.input, options.output, options);
  dumper.dump(cb);
}