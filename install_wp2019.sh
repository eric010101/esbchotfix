#!/bin/bash
dbname=$2
dbuser=$3
dbpass=$4
echo 'dbname= ' $dbname
sudo rm -r /var/www/html/$1
echo 'mkdir = ' $1
sudo mkdir -p /var/www/html/$1
cd /var/www/html/$1
sudo wget https://wordpress.org/latest.zip
sudo unzip -qq latest.zip
sudo cp -a /var/www/html/$1/wordpress/. /var/www/html/$1/
sudo rm -rf /var/www/html/$1/wordpress
sudo rm -f -r latests.zip
#create wp config
cp wp-config-sample.php wp-config.php
#set database details with perl find and replace
sed -i 's/database_name_here/'$2'/g' wp-config.php
sed -i 's/username_here/'$3'/g' wp-config.php
sed -i 's/password_here/'$4'/g' wp-config.php
#create uploads folder and set permissions
mkdir wp-content/uploads
sudo chmod 777 wp-content/uploads