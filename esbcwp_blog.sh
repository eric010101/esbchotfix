#!/bin/sh
INPUT=$(hostname -I)
SUBSTRING=$(echo $INPUT| cut -d' ' -f 1)
IP=$(echo $SUBSTRING | tr -d '[:space:]')


sudo rm -r /var/www/html/blog3/
sudo git clone https://github.com/eric010101/blog3.git /var/www/html/blog3/
sudo cp /var/www/html/blog3/esbcwp_blog3.sql /root/esbcwp_blog3.sql
sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_blog3; create database esbcwp_blog3; GRANT ALL PRIVILEGES ON esbcwp_blog3.* TO esbcwp_blog3_admin@localhost IDENTIFIED BY 'esbcwp_blog3_happy'"
sudo mysql -u root -psweetekhappy esbcwp_blog3 < esbcwp_blog3.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog3; UPDATE wp_options SET option_value='區塊鏈錢包' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog3; UPDATE wp_options SET option_value='您的區塊鏈錢包' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog3; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog3; UPDATE wp_options SET option_value='http://"$IP"/blog3' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog3; UPDATE wp_options SET option_value='http://"$IP"/blog3' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog3; UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog3; UPDATE wp_posts SET guid = REPLACE(guid,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog3; UPDATE wp_revslider_sliders SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog3; UPDATE wp_revslider_slides SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog3; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'www.ilovemyheart.org','"$IP"')"
python3 esbcwp_blog_betheme.py blog3 >blog3.log
sudo systemctl restart apache2

sudo rm -r /var/www/html/blog4/
sudo git clone https://github.com/eric010101/blog4.git /var/www/html/blog4/
sudo cp /var/www/html/blog4/esbcwp_blog4.sql /root/esbcwp_blog4.sql
sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_blog4; create database esbcwp_blog4; GRANT ALL PRIVILEGES ON esbcwp_blog4.* TO esbcwp_blog4_admin@localhost IDENTIFIED BY 'esbcwp_blog4_happy'"
sudo mysql -u root -psweetekhappy esbcwp_blog4 < esbcwp_blog4.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog4; UPDATE wp_options SET option_value='區塊鏈法顧平台' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog4; UPDATE wp_options SET option_value='全球首創區塊鏈法顧平台' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog4; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog4; UPDATE wp_options SET option_value='http://"$IP"/blog4' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog4; UPDATE wp_options SET option_value='http://"$IP"/blog4' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog4; UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog4; UPDATE wp_posts SET guid = REPLACE(guid,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog4; UPDATE wp_revslider_sliders SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog4; UPDATE wp_revslider_slides SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog4; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'www.ilovemyheart.org','"$IP"')"
python3 esbcwp_blog_betheme.py blog4 >blog4.log
sudo systemctl restart apache2

sudo rm -r /var/www/html/blog5/
sudo git clone https://github.com/eric010101/blog5.git /var/www/html/blog5/
sudo cp /var/www/html/blog5/esbcwp_blog5.sql /root/esbcwp_blog5.sql
sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_blog5; create database esbcwp_blog5; GRANT ALL PRIVILEGES ON esbcwp_blog5.* TO esbcwp_blog5_admin@localhost IDENTIFIED BY 'esbcwp_blog5_happy'"
sudo mysql -u root -psweetekhappy esbcwp_blog5 < esbcwp_blog5.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog5; UPDATE wp_options SET option_value='區塊鏈農業平台' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog5; UPDATE wp_options SET option_value='全球首創區塊鏈農業產銷平台' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog5; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog5; UPDATE wp_options SET option_value='http://"$IP"/blog5' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog5; UPDATE wp_options SET option_value='http://"$IP"/blog5' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog5; UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog5; UPDATE wp_posts SET guid = REPLACE(guid,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog5; UPDATE wp_revslider_sliders SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog5; UPDATE wp_revslider_slides SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog5; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'www.ilovemyheart.org','"$IP"')"
python3 esbcwp_blog_betheme.py blog5 >blog5.log
sudo systemctl restart apache2

sudo rm -r /var/www/html/blog6/
sudo git clone https://github.com/eric010101/blog6 /var/www/html/blog6/
sudo cp /var/www/html/blog6/esbcwp_blog6.sql /root/esbcwp_blog6.sql
sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_blog6; create database esbcwp_blog6; GRANT ALL PRIVILEGES ON esbcwp_blog6.* TO esbcwp_blog6_admin@localhost IDENTIFIED BY 'esbcwp_blog6_happy'"
sudo mysql -u root -psweetekhappy esbcwp_blog6 < esbcwp_blog6.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog6; UPDATE wp_options SET option_value='奇林健康平台' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog6; UPDATE wp_options SET option_value='全球首創區塊鏈健康生活平台' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog6; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog6; UPDATE wp_options SET option_value='http://"$IP"/blog6' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog6; UPDATE wp_options SET option_value='http://"$IP"/blog6' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog6; UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog6; UPDATE wp_posts SET guid = REPLACE(guid,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog6; UPDATE wp_revslider_sliders SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog6; UPDATE wp_revslider_slides SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog6; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'www.ilovemyheart.org','"$IP"')"
python3 esbcwp_blog_betheme.py blog6 >blog6.log
sudo systemctl restart apache2

sudo rm -r /var/www/html/blog7/
sudo git clone https://github.com/eric010101/blog7.git /var/www/html/blog7/
sudo cp /var/www/html/blog7/esbcwp_blog7.sql /root/esbcwp_blog7.sql
sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_blog7; create database esbcwp_blog7; GRANT ALL PRIVILEGES ON esbcwp_blog7.* TO esbcwp_blog7_admin@localhost IDENTIFIED BY 'esbcwp_blog7_happy'"
sudo mysql -u root -psweetekhappy esbcwp_blog7 < esbcwp_blog7.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog7; UPDATE wp_options SET option_value='造鏈APP' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog7; UPDATE wp_options SET option_value='您的區塊鏈造鏈機' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog7; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog7; UPDATE wp_options SET option_value='http://"$IP"/blog7' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog7; UPDATE wp_options SET option_value='http://"$IP"/blog7' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog7; UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog7; UPDATE wp_posts SET guid = REPLACE(guid,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog7; UPDATE wp_revslider_sliders SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog7; UPDATE wp_revslider_slides SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog7; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'www.ilovemyheart.org','"$IP"')"
python3 esbcwp_blog_betheme.py blog7 >blog7.log
sudo systemctl restart apache2

sudo rm -r /var/www/html/blog8/
sudo git clone https://github.com/eric010101/blog8.git /var/www/html/blog8/
sudo cp /var/www/html/blog8/esbcwp_blog8.sql /root/esbcwp_blog8.sql
sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_blog8; create database esbcwp_blog8; GRANT ALL PRIVILEGES ON esbcwp_blog8.* TO esbcwp_blog8_admin@localhost IDENTIFIED BY 'esbcwp_blog8_happy'"
sudo mysql -u root -psweetekhappy esbcwp_blog8 < esbcwp_blog8.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog8; UPDATE wp_options SET option_value='清潔能源' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog8; UPDATE wp_options SET option_value='您的區塊鏈能源平台' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog8; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog8; UPDATE wp_options SET option_value='http://"$IP"/blog8' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog8; UPDATE wp_options SET option_value='http://"$IP"/blog8' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog8; UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog8; UPDATE wp_posts SET guid = REPLACE(guid,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog8; UPDATE wp_revslider_sliders SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog8; UPDATE wp_revslider_slides SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog8; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'www.ilovemyheart.org','"$IP"')"
python3 esbcwp_blog_betheme.py blog8 >blog8.log
sudo systemctl restart apache2

sudo rm -r /var/www/html/blog9/
sudo git clone https://github.com/eric010101/blog9.git /var/www/html/blog9/
sudo cp /var/www/html/blog9/esbcwp_blog9.sql /root/esbcwp_blog9.sql
sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_blog9; create database esbcwp_blog9; GRANT ALL PRIVILEGES ON esbcwp_blog9.* TO esbcwp_blog9_admin@localhost IDENTIFIED BY 'esbcwp_blog9_happy'"
sudo mysql -u root -psweetekhappy esbcwp_blog9 < esbcwp_blog9.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_options SET option_value='Charity' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_options SET option_value='您的區塊鏈捐款平台' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_options SET option_value='http://"$IP"/blog9' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_options SET option_value='http://"$IP"/blog9' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_posts SET post_content = REPLACE(post_content,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_posts SET guid = REPLACE(guid,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_revslider_sliders SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_revslider_slides SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog9; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'www.ilovemyheart.org','"$IP"')"
python3 esbcwp_blog_betheme.py blog9 >blog9.log
sudo systemctl restart apache2

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
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_postmeta SET meta_value = REPLACE(meta_value,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_posts SET post_content = REPLACE(post_content,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_posts SET guid = REPLACE(guid,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_revslider_sliders SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_revslider_slides SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'www.ilovemyheart.org','"$IP"')"
python3 esbcwp_blog_betheme.py blog10 >blog10.log
sudo systemctl restart apache2

sudo rm -r /var/www/html/shop1/
sudo git clone https://github.com/eric010101/shop1.git /var/www/html/shop1/
sudo cp /var/www/html/shop1/esbcwp_shop1.sql /root/esbcwp_shop1.sql
sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_shop1; create database esbcwp_shop1; GRANT ALL PRIVILEGES ON esbcwp_shop1.* TO esbcwp_shop1_admin@localhost IDENTIFIED BY 'esbcwp_shop1_happy'"
sudo mysql -u root -psweetekhappy esbcwp_shop1 < esbcwp_shop1.sql
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_options SET option_value='區塊鏈商店' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_options SET option_value='您的區塊鏈商店平台' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_options SET option_value='http://"$IP"/shop1' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_options SET option_value='http://"$IP"/shop1' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_posts SET post_content = REPLACE(post_content,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_posts SET guid = REPLACE(guid,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_revslider_sliders SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_revslider_slides SET params = REPLACE(params,'www.ilovemyheart.org','"$IP"')"
sudo mysql -u root -psweetekhappy -e "use esbcwp_shop1; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'www.ilovemyheart.org','"$IP"')"
sudo systemctl restart apache2
