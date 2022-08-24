# nodejs-starterkit

#### Preparing database

```
sudo su - postgres
psql

postgres=# CREATE USER user_test WITH PASSWORD 'password_test';
postgres=# CREATE DATABASE db_test OWNER user_test;
postgres=# GRANT  ALL ON DATABASE db_test TO user_test;
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

Step:

1. Create or edit existing DB
   if DB existing

- add new table based on schema and data
  default password test/12345678
