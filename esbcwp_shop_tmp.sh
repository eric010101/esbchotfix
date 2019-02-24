#!/bin/bash

sudo mysql -u root -psweetekhappy -e "create database esbcwp_shop; GRANT ALL PRIVILEGES ON esbcwp_shop.* TO ESBCadmin@localhost IDENTIFIED BY 'ESBChappy'"
sudo mysql -u root -psweetekhappy esbcwp_shop < esbcwp_shop.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='the $ESBC_HEADTITLE$ BlockChain Shop' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='the $ESBC_HEADTITLE$ BlockChain Shop' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='http://$SSH_IP$/shop' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='http://$SSH_IP$/shop' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='/var/www/html/shop/wp-content/uploads' WHERE option_name='upload_path'"

APP_PASS="ESBCadmin"
ROOT_PASS="sweetekhappy"
APP_DB_PASS="ESBDhappy"

echo "phpmyadmin phpmyadmin/dbconfig-install boolean true" | debconf-set-selections
echo "phpmyadmin phpmyadmin/app-password-confirm password $APP_PASS" | debconf-set-selections
echo "phpmyadmin phpmyadmin/mysql/admin-pass password $ROOT_PASS" | debconf-set-selections
echo "phpmyadmin phpmyadmin/mysql/app-pass password $APP_DB_PASS" | debconf-set-selections
echo "phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2" | debconf-set-selections

sudo apt-get install -y phpmyadmin