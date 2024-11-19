#!/bin/sh


# Echo the account being used by gsutil
echo "The active account being used by gsutil is:"
gcloud auth list

BACKUP_PATH="/tmp/backup-$(date +\%Y-\%m-\%d).sql"

PGPASSWORD=$POSTGRES_PASSWORD pg_dump --host=postgres-db-svc --username=postgres --file=$BACKUP_PATH --format=custom

gsutil cp $BACKUP_PATH gs://postgres-backup-tfhuhtal

rm $BACKUP_PATH
