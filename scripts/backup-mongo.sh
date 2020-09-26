#!/usr/bin/env bash

BUCKET_NAME=osrsloadouts-backups

BACKUP_NAME="${OSRSLOADOUTS_MONGO_DB}_`date +"%Y%m%d_%H%M%S"`.dump.gz"
BACKUP_PATH="/tmp/${BACKUP_NAME}"

GC_FILE_PATH="gs://$BUCKET_NAME/$BACKUP_NAME"

mongodump --uri=${OSRSLOADOUTS_MONGO_ADDR} --gzip --archive=${BACKUP_PATH}

gsutil cp ${BACKUP_PATH} ${GC_FILE_PATH}