'use strict';

var path = require('path');
var _ = require('lodash');
var Elasticdump = require('elasticdump').elasticdump;
var debug = require('debug')('kibana4-backup');
var elasticdumpOptions = require('../elasticdump-options');
var config = require('../config');

module.exports = promoteDump;

function promoteDump(file, cb) {
  var options = _.defaults({
    input: path.resolve(config.promoteDir, file),
    output: config.promoteUrl
  }, elasticdumpOptions);  
  debug('Promoting %s to %s', file, config.promoteUrl);
  var dumper = new Elasticdump(options.input, options.output, options);
  dumper.dump(cb);
}