#!/bin/bash
set -e

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE EXTENSION postgis;

EOSQL