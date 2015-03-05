'use strict';

var _ = require('lodash');
var Elasticdump = require('elasticdump').elasticdump;
var elasticdumpOptions = require('../elasticdump-options');
var config = require('../get-config');

module.exports = saveDataToTemp;

function saveDataToTemp(cb) {
  var options = _.defaults({
    input: config.elasticsearchUrl,
    output: config.tempFile
  }, elasticdumpOptions);
  
  var dumper = new Elasticdump(options.input, options.output, options);
  // dumper.on('log', function(message){ console.log(message);});
  // dumper.on('debug', function(message){ console.log(message);});
  // dumper.on('error', function(message){ console.log(message);});
  dumper.dump(cb);
}

