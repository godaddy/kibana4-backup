## 0.3.0 (March 7, 2015)

Features:

  - Added -i option, which lets you specify the elasticsearch index to target.  Defaults to .kibana.  This lets you target your Kibana 3 indexes.
  - Improved documentation a bit.

Bug Fixes:

  - Fixed the environment argument.

## 0.2.2 (March 6, 2015)

Bug Fixes:

  - Fixed file creation failure when kibana assets are saved with invalid filename characters
  - Now ensuring that spaces are encoded properly in urls

## 0.2.1 (March 5, 2015)

Bug Fixes:

  - Fixed write perm issue with temp directory not honoring -d option

## 0.2.0 (March 5, 2015)

Features:

  - Added -d flag, which accepts a directory path to use for the git cloning, avoiding the permissions issue with a global npm install when not running kibana4-backup as a user which has write access to the global install location.

Bug Fixes:

  - Fixed restore

## 0.1.0 (March 5, 2015)

Initial release.

Features:

  - Backup, restore, and deploy changes to your kibana4 instances
  - Changes stored in a git repo
  