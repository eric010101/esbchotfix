#!/bin/bash

sudo rm -r /var/www/html/zdao01/
sudo git clone https://github.com/eric010101/zdao01.git /var/www/html/zdao01/
sudo cp /var/www/html/zdao01/esbc_zdao01.sql /root/esbc_zdao01.sql
sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbc_zdao01"
sudo mysql -u root -psweetekhappy -e "create database esbc_zdao01; GRANT ALL PRIVILEGES ON esbc_zdao01.* TO esbc_zdao01_admin@localhost IDENTIFIED BY 'esbc_zdao01_happy'"
sudo mysql -u root -psweetekhappy esbc_zdao01 < esbc_zdao01.sql
sudo mysql -u root -psweetekhappy -e "REVOKE ALL PRIVILEGES ON esbc_zdao01.* FROM esbc_zdao01_admin@localhost;"
sudo mysql -u root -psweetekhappy -e "GRANT ALL PRIVILEGES ON esbc_zdao01.* TO esbc_zdao01_admin@localhost WITH GRANT OPTION;"
python3 esbc_zdao_update.py zdao01 >zdao01.log
sudo systemctl restart apache2