#!/bin/sh
sudo apt install vsftpd -y
sudo ufw allow OpenSSH
sudo ufw allow 20/tcp

sudo ufw allow 21/tcp

sudo ufw allow 40000:50000/tcp

sudo ufw allow 990/tcp

useradd -p `openssl passwd -1 erichappy` ericwang

useradd -p `openssl passwd -1 sunnyhappy` sunny

useradd -p `openssl passwd -1 sweetekhappy` ftpuser

sudo cp vsftpd.allowed_users /etc/vsftpd.allowed_users

sudo cp vsftpd.conf etc/vsftpd.conf

sudo usermod -d /var/www ericwang

sudo chown ericwang:ericwang /var/www/html

sudo usermod -d /var/www sunny

sudo chown sunny:sunny /var/www/html

sudo usermod -d /var/www ftpuser

sudo chown ftpuser:ftpuser /var/www/html

sudo systemctl restart vsftpd

sudo apt-get install zip -y

sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

sudo apt-get install -y nodejs

nodejs –v

sudo apt-get install -y npm

npm –v

npm install web3@0.20.2 --save

sudo npm ls web3

sudo npm i --save cors

sudo npm install express --save

sudo apt-get install software-properties-common -y

sudo add-apt-repository -y ppa:ethereum/ethereum 

sudo apt-get install ethereum -y

geth version 

sudo apt update

sudo apt install expect -y

sudo npm install -g forever

sudo npm install forever-service -g

sudo npm install -g moment

sudo apt-get install python3-pip -y

sudo pip3 install requests

sudo rm /etc/systemd/system/node*.service

sudo rm /etc/systemd/system/port*.service

sudo rm /etc/systemd/system/erc20*.service

sudo rm /etc/systemd/system/explorer.service

