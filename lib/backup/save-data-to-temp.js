'use strict';

var _ = require('lodash');
var Elasticdump = require('elasticdump').elasticdump;
var debug = require('debug')('kibana4-backup');
var elasticdumpOptions = require('../elasticdump-options');
var config = require('../config');

module.exports = saveDataToTemp;

function saveDataToTemp(cb) {
  debug('Saving .kibana index data to temp directory');
  var options = _.defaults({
    input: config.elasticsearchUrl,
    output: config.tempFile
  }, elasticdumpOptions);
  var dumper = new Elasticdump(options.input, options.output, options);
  dumper.dump(cb);
}

