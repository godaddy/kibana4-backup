'use strict';

var fs = require('fs');
var config = require('../config')();

module.exports = clearExistingTemp;

function clearExistingTemp(cb) {
  fs.unlink(config.tempFile, function () {
    // don't care about any errors here
    cb();
  });
}