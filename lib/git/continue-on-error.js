'use strict';

/**

This method exists to deal with the following situation:

git()
  .add('--a')
  .commit('Blah', someCb)

If there is nothing to commit, an error will occur in the commit method.
However, we don't want to treat it as an error situation and if we call it
like this it will kill the async pipeline.  So we just ignore errors.  

TODO: We may need to parse the error to recognize real error conditions.

*/

module.exports = continueOnError;

function continueOnError(cb) {
  return function(err, data) {
    if(err)
      return cb();
    cb(null, data);
  };
}
