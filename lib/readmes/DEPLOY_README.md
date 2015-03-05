This is where you can place files to be deployed to the environment.  Once the files have been deployed to the environment, they will be automatically deleted.

To solidify why this is useful:

1. Copy dashboard file from test/backup to prod/deploy
2. Commit and push
3. Wait for your kibana4-backup to run in the prod environment.

You've now moved a dashboard from test to prod in a rollback-friendly manner.