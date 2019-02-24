#!/bin/sh
sudo apt install unzip -y
sudo chmod -R 0777 .
sudo apt install apache2 -y
sudo ufw app list
sudo ufw app info "Apache Full"
sudo ufw allow in "Apache Full"
sudo apt install curl -y
curl http://icanhazip.com
sudo apt-get install rcconf
sudo rcconf
update-rc.d
sudo update-rc.d -f apache2 add
sudo apt install mysql-server -y
chmod 700 installmysql.sh
./installmysql.sh
mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sweetekhappy';"
mysql --user="root" --password="sweetekhappy" -e "SELECT user,authentication_string,plugin,host FROM mysql.user;"
sudo apt install php libapache2-mod-php php-mysql -y
sudo cp dir.conf /etc/apache2/mods-enabled/
sudo systemctl restart apache2
sudo systemctl status apache2
sudo apt show php-cli
sudo apt install php-cli -y
sudo apt install php-mbstring git -y
