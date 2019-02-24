#!/bin/bash

sudo mysql -u root -psweetekhappy -e "create database esbcwp_blog; GRANT ALL PRIVILEGES ON esbcwp_blog.* TO ESBCadmin@localhost IDENTIFIED BY 'ESBChappy'"
sudo mysql -u root -psweetekhappy esbcwp_blog < esbcwp_blog.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog; UPDATE wp_options SET option_value='the $ESBC_HEADTITLE$ BlockChain blog' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog; UPDATE wp_options SET option_value='the $ESBC_HEADTITLE$ BlockChain blog' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog; UPDATE wp_options SET option_value='http://$SSH_IP$/blog' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog; UPDATE wp_options SET option_value='http://$SSH_IP$/blog' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog; UPDATE wp_options SET option_value='/var/www/html/blog/wp-content/uploads' WHERE option_name='upload_path'"