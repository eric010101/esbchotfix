#!/bin/bash

sudo addgroup esbc
sudo chmod +x sftp.pl
sudo expect sftp.pl $1 $2
sudo usermod -G esbc -s /bin/false $1
sudo addgroup ssh-users
sudo usermod -a -G ssh-users root
sudo mkdir /var/www
sudo mkdir /var/www/html
sudo chown root:esbc /var/www/html
sudo chmod 770 /var/www/html
sudo cp sshd_config /etc/ssh/sshd_config
echo -e "done with installing sftp \n"
