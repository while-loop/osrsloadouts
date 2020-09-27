#!/usr/bin/env bash

set -eu -o pipefail
function print_error {
    read line file <<<$(caller)
    echo "An error occurred in line $line of file $file:" >&2
}
trap print_error ERR


cd $(dirname $0)/migrations
echo `pwd`

cur_version=`mongo ${OSRSLOADOUTS_MONGO_ADDR} --quiet --eval "db.db_migrations.findOne({}).db_version"`

if [[ "${cur_version}" = "" ]]; then
    echo "error: no version found"
    exit 1
fi

total_files=`ls . | wc -l`

echo Running migration cur_version: ${cur_version} total_files: ${total_files}...

cur_version=$((${cur_version} + 1))

for i in $(seq ${cur_version} ${total_files}); do
    echo ${i}
    migration_file=`ls . | grep "^${i}_.*\.js"`

    echo $i $migration_file
    mongo ${OSRSLOADOUTS_MONGO_ADDR} --quiet ${migration_file}

    if [[ $? -ne 0 ]]; then
      echo "failed to run migration ${migration_file}"
      exit 1
    fi

done
