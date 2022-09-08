# Rama Nodejs starterkit

#### Preparing database

```
sudo su - postgres
psql

postgres=# CREATE USER test WITH PASSWORD 'test';
postgres=# CREATE DATABASE db_test OWNER test;
postgres=# GRANT  ALL ON DATABASE db_test TO test;
```

#### Expose From Outside

```
sudo nano /etc/postgresql/14/main/pg_hba.conf
# IPv4 local connections:
host    all             all             0.0.0.0/0               md5

sudo nano /etc/postgresql/14/main/postgresql.conf
listen_addresses = '*'
```

#### Restart service

```
sudo systemctl restart postgresql
```

#### Import sql

we can import using navicat or using command

```
psql -U test db_test < import-this-only-on-public.sql
```

```
nodejs-starterkit/import-me-SQL/import-this-only-on-public.sql
```

#### Test API

https://documenter.getpostman.com/view/8530436/VUquKats
