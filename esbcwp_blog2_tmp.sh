#!/bin/bash

sudo mysql -u root -psweetekhappy -e "create database esbcwp_blog2; GRANT ALL PRIVILEGES ON esbcwp_blog2.* TO ESBCadmin@localhost IDENTIFIED BY 'ESBChappy'"
sudo mysql -u root -psweetekhappy esbcwp_blog2 < esbcwp_blog2.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog2; UPDATE wp_options SET option_value='南乡晨初 部落格' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog2; UPDATE wp_options SET option_value='全球首創區塊鏈創作發表平台' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog2; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog2; UPDATE wp_options SET option_value='http://$SSH_IP$/blog2' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog2; UPDATE wp_options SET option_value='http://$SSH_IP$/blog2' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog2; UPDATE wp_options SET option_value='http://$SSH_IP$/blog2/wp-content/uploads' WHERE option_name='upload_path'"