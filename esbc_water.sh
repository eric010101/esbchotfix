#!/bin/bash

sudo mysql -u root -psweetekhappy -e "create database esbc_water; GRANT ALL PRIVILEGES ON esbc_water.* TO ESBCadmin@localhost IDENTIFIED BY 'ESBChappy'"
sudo mysql -u root -psweetekhappy esbc_water < esbc_water.sql
