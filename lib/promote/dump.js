'use strict';

var path = require('path');
var _ = require('lodash');
var Elasticdump = require('elasticdump').elasticdump;
var elasticdumpOptions = require('../elasticdump-options');
var config = require('../get-config');

module.exports = promoteDump;

function promoteDump(file, cb) {
  var options = _.defaults({
    input: path.resolve(config.promoteDir, file),
    output: config.promoteUrl
  }, elasticdumpOptions);  
  console.log('Promoting ' + options.input);
  console.log(options.output);
  var dumper = new Elasticdump(options.input, options.output, options);
  dumper.dump(cb);
}