#!/bin/bash
INPUT=$(hostname -I)
SUBSTRING=$(echo $INPUT| cut -d' ' -f 1)
IP=$(echo $SUBSTRING | tr -d '[:space:]')
blogstr=$1
sitename=$2
sitedesc=$3
sourcesite=$4 #"www.gogocode.com"

x1="/var/www/html/"$blogstr"/"
sudo rm -r $x1

x2="https://github.com/eric010101/"$blogstr".git"
#x2="https://github.com/eric010101/blog10.git"
y2="/var/www/html/"$blogstr"/"
sudo git clone $x2 $y2

x3="/var/www/html/"$blogstr"/esbcwp_"$blogstr".sql"
y3="/root/esbcwp_"$blogstr".sql"
echo $x3
echo $y3
sudo cp $x3 $y3 

sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_"$blogstr
sudo mysql -u root -psweetekhappy -e "create database esbcwp_"$blogstr"; GRANT ALL PRIVILEGES ON esbcwp_"$blogstr".* TO esbcwp_"$blogstr"_admin@localhost IDENTIFIED BY 'esbcwp_"$blogstr"_happy'"

sudo mysql -u root -psweetekhappy -e "DROP DATABASE esbcwp_"$blogstr"; create database esbcwp_"$blogstr"; GRANT ALL PRIVILEGES ON esbcwp_"$blogstr".* TO esbcwp_"$blogstr"_admin@localhost IDENTIFIED BY 'esbcwp_"$blogstr"_happy'"
z="sudo mysql -u root -psweetekhappy esbcwp_"$blogstr" < esbcwp_"$blogstr".sql"
echo $z
eval $z

sudo mysql -u root -psweetekhappy -e "use esbcwp_"$blogstr"; UPDATE wp_options SET option_value='"$sitename"' WHERE option_name='blogname'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_"$blogstr"; UPDATE wp_options SET option_value='"$sitedesc"' WHERE option_name='blogdescription'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_"$blogstr"; UPDATE wp_options SET option_value='pengyauwang@hotmail.com' WHERE option_name='admin_email'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_"$blogstr"; UPDATE wp_options SET option_value='http://"$IP"/"$blogstr"' WHERE option_name='siteurl'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_"$blogstr"; UPDATE wp_options SET option_value='http://"$IP"/"$blogstr"' WHERE option_name='home'"
sudo mysql -u root -psweetekhappy -e "use esbcwp_"$blogstr"; UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
#sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_options SET option_value = REPLACE(option_value,'www.gogocode.com','"$IP"')"
#sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_postmeta SET meta_value = REPLACE(meta_value,'themes.muffingroup.com/be/school','"$IP"/blog10') where meta_key='mfn-page-items-seo'"
#sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_postmeta SET meta_value = ''where meta_key='mfn-page-items'"
#sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_postmeta SET meta_value = REPLACE(meta_value,'www.gogocode.com','"$IP"')"
#sudo mysql -u root -psweetekhappy -e "use esbcwp_blog10; UPDATE wp_posts SET post_content = REPLACE(post_content,'www.gogocode.com','"$IP"')" 
sudo mysql -u root -psweetekhappy -e "use esbcwp_"$blogstr"; UPDATE wp_posts SET guid = REPLACE(guid,'"$sourcesite"','"$IP"')" 
sudo mysql -u root -psweetekhappy -e "use esbcwp_"$blogstr"; UPDATE wp_revslider_sliders SET params = REPLACE(params,'"$sourcesite"','"$IP"')" 
sudo mysql -u root -psweetekhappy -e "use esbcwp_"$blogstr"; UPDATE wp_revslider_slides SET params = REPLACE(params,'"$sourcesite"','"$IP"')" 
sudo mysql -u root -psweetekhappy -e "use esbcwp_"$blogstr"; UPDATE wp_revslider_slides SET layers = REPLACE(layers,'"$sourcesite"','"$IP"')" 

z="python3 esbcwp_blog_betheme.py "$blogstr" > "$blogstr".log"
echo $z
eval $z
sudo systemctl restart apache2