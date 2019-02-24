#!/bin/bash

sudo mysql -u root -psweetekhappy -e "create database esbcwp_shop; GRANT ALL PRIVILEGES ON esbcwp_shop.* TO ESBCadmin@localhost IDENTIFIED BY 'ESBChappy'"
sudo mysql -u root -psweetekhappy esbcwp_shop < esbcwp_shop.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='the $host_title$ BlockChain Shop' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='the $host_title$ BlockChain Shop' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='http://$SSH_ip$/shop' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='http://$SSH_ip$/shop' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop; UPDATE wp_options SET option_value='http://$SSH_ip$/shop/wp-content/uploads' WHERE option_name='upload_path'"