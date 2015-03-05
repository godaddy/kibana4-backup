'use strict';

/**

This method exists to deal with the following situation:

git()
  .add('--a')
  .commit('Blah')
  .push('master', someCb)

If there is nothing to commit, an error will occur in the commit method,
resulting in someCb never being fired.  But we can't just pass someCb to 
commit as well, because that would result in it being called twice (once
push succeeded/fails).  So we want to only call someCb when an error state
occurrs.  However, we don't want to pass the err to the cb, because that would
kill our async pipeline.

*/

module.exports = cbOnError;

function cbOnError(cb) {
  return function(err, data) {
    if(err)
      return cb();
    cb(null, data);
  };
}
