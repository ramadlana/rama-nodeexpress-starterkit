# Rama Nodejs starterkit v1

#### Preparing database

```
sudo su - postgres
psql

postgres=# CREATE USER test WITH PASSWORD 'test';
postgres=# CREATE DATABASE db_test OWNER test;
postgres=# GRANT  ALL ON DATABASE db_test TO test;
```

#### initial username password

```
user: test
password: test12345
```

#### Prisma Pull, pull db from postgresql

```
npx prisma db pull
npx prisma generate
```

####

if we want, create database from zero, without importing using generate.
prisma will generate database from schema.prisma and push it to postgresql

```
npx prisma migrate
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

#### Standart Response JSON

```
{
  "status": 200,
  "data": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" },
    { "id": 3, "name: "Charlie" }
  ],
  "message": "Success"
}

{
  "status": 400,
  "data": null,
  "message": "Missing required field: name"
}

```

#### Test API

https://documenter.getpostman.com/view/8530436/VUquKats
