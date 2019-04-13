#!/bin/bash

sudo apt-get install vsftpd
sudo systemctl start vsftpd
sudo systemctl enable vsftpd
sudo addgroup sftp-users
sudo chmod +x sftp.pl
sudo expect sftp.pl $1 $2
sudo usermod -G sftp-users -s /bin/false $1
sudo addgroup ssh-users
sudo usermod -a -G ssh-users root
sudo mkdir /var/www
sudo mkdir /var/www/html
sudo chown root:sftp-users /var/www/html
sudo chmod 770 /var/www/html

echo -e "done with installing sftp \n"
