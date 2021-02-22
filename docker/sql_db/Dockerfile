FROM postgres:13
RUN apt-get update \
    && apt-get install wget -y \
    && apt-get install postgresql-13-postgis-3 -y \
    && apt-get install postgis -y


ADD ./init.sql /docker-entrypoint-initdb.d/