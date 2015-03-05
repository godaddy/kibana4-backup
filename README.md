kibana4-backup
==============

**WORK IN PROGRESS, UNSTABLE**

Backup, restore, and promote changes to Kibana 4 configs, index-patterns, dashboards, searches, and visualizations.

The intention of kibana4-backup is to make sure any changes you make to your Kibana 4 instance will be backed up in source control, with the ability to easily restore them.  Furthermore, it provides a way to promote changes between different environments (i.e. elasticsearch clusters).

# Prerequistes

* The box you install kibana4-backup on must have git installed
* The user you run `./kibana4-backup` as must have SSH access to your backup repo
* The ssh private key MUST NOT have a passphrase
* The box you install kibana4-backup on must have firewall access to the elasticsearch HTTP url

# Usage

```
npm install -g kibana4-backup
kibana4-backup --elasticsearch-url http://myelasticsearch.com:9200 --repo git@github.com:myorg/myrepo.git
```

We leave process management up to you.  Running kibana4-backup from the command line will only run it a single time.  You could create a cron to run it at an interval.  In the future we'd like to daemonize this an provide a way to run it at an interval.

## Restore

The restore logic is the first step in the process.  If the .kibana index does not exist, the latest backup files from the repo/environment you specify will be PUT'd to the index.

## Promote

TBD

## Backup

The last step in the process is to perform the backup. The .kibana index will be pulled from elasticsearch and any new configs/index-patterns/dashboards/searches/visualizations will be saved to the correct environment/backup folder.  The changes will then be committed and pushed to the GitHub repo.

# Options

```
kibana4-backup --help

  Usage: kibana4-backup [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -r, --repo <url>                 REQUIRED - git repo to store kibana4 data
    -s, --elasticsearch-url <url>    REQUIRED - elasticsearch http url you want to backup
    -e, --environment <env>          the environment you are targetting for backup
    -p, --promote-environment <env>  the environment you are targetting for promotion
    -t, --promote-url <url>          elasticsearch http url you want to target for promote
    -c, --commit-message <message>   commit message to use during backup
```
