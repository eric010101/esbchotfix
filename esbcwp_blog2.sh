#!/bin/sh
INPUT=$(hostname -I)
SUBSTRING=$(echo $INPUT| cut -d' ' -f 1)
IP=$(echo $SUBSTRING | tr -d '[:space:]')

sudo rm -r /var/www/html/blog10/
sudo git clone https://github.com/eric010101/blog10.git /var/www/html/blog10/
sudo cp /var/www/html/blog10/esbcwp_blog10.sql /root/esbcwp_blog10.sql
sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_blog10; create database esbcwp_blog10; GRANT ALL PRIVILEGES ON esbcwp_blog10.* TO esbcwp_blog10_admin@localhost IDENTIFIED BY 'esbcwp_blog10_happy'"
sudo mysql -u root -psweetekhappy esbcwp_blog10 < esbcwp_blog10.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_options SET option_value='區塊鏈學園' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_options SET option_value='您的區塊鏈學習平台' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_options SET option_value='http://"$IP"/blog10' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_options SET option_value='http://"$IP"/blog10' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
#sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_options SET option_value = REPLACE(option_value,'www.gogocode.com','"$IP"')"
#sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_postmeta SET meta_value = REPLACE(meta_value,'themes.muffingroup.com/be/school','"$IP"/blog10') where meta_key='mfn-page-items-seo'"
#sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_postmeta SET meta_value = ''where meta_key='mfn-page-items'"
#sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_postmeta SET meta_value = REPLACE(meta_value,'www.gogocode.com','"$IP"')"
#sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_posts SET post_content = REPLACE(post_content,'www.gogocode.com','"$IP"')" 
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_posts SET guid = REPLACE(guid,'www.gogocode.com','"$IP"')" 
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_revslider_sliders SET params = REPLACE(params,'www.gogocode.com','"$IP"')" 
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_revslider_slides SET params = REPLACE(params,'www.gogocode.com','"$IP"')" 
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'www.gogocode.com','"$IP"')" 
python3 esbcwp_blog_betheme.py blog10 >blog10.log
sudo systemctl restart apache2