kibana4-backup
==============

**WORK IN PROGRESS, UNSTABLE**

Backup, restore, and promote changes to Kibana 4 configs, index-patterns, dashboards, searches, and visualizations.

The intention of kibana4-backup is to make sure any changes you make to your Kibana 4 instance will be backed up in source control, with the ability to easily restore them.  Furthermore, it provides a way to promote changes between different environments (i.e. elasticsearch clusters).

# How to use

1. Fork this repo to your own GitHub organization
2. Clone your forked repo to a server where you will run the backup process
3. Modify ./options.json to your liking
4. Run `./kibana4-backup` (you may want to daemonize it with your own process manager)

## Backup

Backup starts as soon as you run `./kibana4-backup`.  At the configured interval, the .kibana index will be pulled, and any new configs/index-patterns/dashboards/searches/visualizations will be saved to the correct environment/backup folder.  The changes will then be committed and pushed to the GitHub repo.

## Restore

If the .kibana index does not exist, the latest backup files for that environment will be PUT'd to the index.

## Promote

Promoting a change from one environment to the next is as easy as copying the files from the source environment's backup folder and pasting them into the target environments promote folder.

# Options

Options are configured in options.json.

* `interval` -- int: Run backup/restore/promote every X seconds.  Default is `5`.
* `commitMessage` -- string/pattern: The commit message to use when commiting changes caused by a backup. Default is `'Backup %e'`
  * %e will be replaced by the NODE_ENV value
* `elasticsearchUrls` -- object REQUIRED: This is a mapping between your NODE_ENV and the elasticsearch HTTP endpoint you want to backup.  The key should be the NODE_ENV value, and the value should be the url to your elasticsaerch HTTP endpoint.  e.g.
```json
{
  "elasticsearchUrls": {
    "dev": "http://mydevelasticseach.com:9200/",
    "prod": "http://myelasticseach.com:9200/",
  }
}
```
* 'promoteMap' -- object REQUIRED: This is a mapping between your NODE_ENV and the NODE_ENV it should target when promoting changes.  The key is the source NODE_ENV and the value is the target NODE_ENV. e.g.
```json
{
  "promoteMap": {
    "dev": "test",
    "test": "prod"
  }
}
```
# Requirements

* The server you clone your fork to must have git installed (obviously)
* The user you run `./kibana4-backup` as must have SSH access to your forked repo
* The server you clone your fork to must have access to the elasticsearch HTTP endpoint
* You must define a NODE_ENV environment variable corresponding the environment you're running in (no whitespace)
