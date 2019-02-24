#!/bin/bash

#export DEBIAN_FRONTEND=noninteractive
sudo apt install mysql-server -y

apt -y install expect

# Not required in actual script
MYSQL_ROOT_PASSWORD=sweetekhappy
#expect "Type 'help;' or '\h' for help. Type '\c' to clear the current input statement."

SECURE_MYSQL=$(expect -c "

set timeout 10

spawn sudo ufw enable

expect "Command may disrupt existing ssh connections. Proceed with operation (y|n)?"
send "y\r"

spawn mysql_secure_installation

expect "Press y|Y for Yes, any other key for No: "
send "n\r"
expect "New password:"
send "$MYSQL_ROOT_PASSWORD\r"
expect "Re-enter new password:"
send "$MYSQL_ROOT_PASSWORD\r"
expect "Remove anonymous users?"
send "y\r"
expect "Disallow root login remotely?"
send "y\r"
expect "Remove test database and access to it?"
send "y\r"
expect "Reload privilege tables now?"
send "y\r"
expect eof
")

echo "$SECURE_MYSQL"

apt -y purge expect
#sudo mysql
