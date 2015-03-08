'use strict';

var path = require('path');
var _ = require('lodash');
var Elasticdump = require('elasticdump').elasticdump;
var debug = require('debug')('kibana4-backup');
var elasticdumpOptions = require('../elasticdump-options');
var config = require('../config');

module.exports = deployDump;

function deployDump(file, cb) {
  var options = _.defaults({
    input: path.resolve(config.deployDir, file),
    output: config.elasticsearchUrl
  }, elasticdumpOptions);  
  debug('Deploying %s to %s', file, config.elasticsearchUrl);
  var dumper = new Elasticdump(options.input, options.output, options);
  dumper.dump(cb);
}