#!/usr/bin/python3
import sys
import socket


def get_host_ip():
	try:
		s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
		s.connect(('8.8.8.8', 80))
		ip = s.getsockname()[0]
	finally:
		s.close()

	return ip
def inplace_change(filename, old_string, new_string):
    # Safely read the input filename using 'with'
    with open(filename) as f:
        s = f.read()
        if old_string not in s:
            print(old_string,"not found in ",filename)
            return

    # Safely write the changed content, if found in the file
    with open(filename, 'w') as f:
        print('Changing ',old_string, ' to ',new_string,' in ',filename)
        s = s.replace(old_string, new_string)
        f.write(s)


zdaoarr=sys.argv
zdaon=zdaoarr[1]
str2=get_host_ip()
a="helper::import('d:/xampp/htdocs/zdao01"
b="helper::import('/var/www/html/"+zdaon        
filex="/var/www/html/"+zdaon+"/tmp/model/attend.php"
inplace_change(filex, a, b)

filex="/var/www/html/"+zdaon+"/tmp/model/user.php"
inplace_change(filex, a, b)

filex="/var/www/html/"+zdaon+"/tmp/model/common.php"
inplace_change(filex, a, b)

a="RedirectMatch 301 ^/zdao01/$ http://loclhost/zdao01/www"
b="RedirectMatch 301 ^/"+zdaon+"/$ http://"+str2+"/"+zdaon+"/www"
filex="/var/www/html/"+zdaon+"/.htaccess"
inplace_change(filex, a, b)

a="$config->db->name     = 'esbc_zdao01';"
b="$config->db->name     = 'esbc_"+zdaon+"';"
filex="/var/www/html/"+zdaon+"/config/my.php"
inplace_change(filex, a, b)

a="$config->db->user     = 'ESBCadmin';"
b="$config->db->user     = 'esbc_"+zdaon+"_admin';"
filex="/var/www/html/"+zdaon+"/config/my.php"
inplace_change(filex, a, b)

a="$config->db->password = 'ESBChappy';"
b="$config->db->password = 'esbc_"+zdaon+"_happy';"
filex="/var/www/html/"+zdaon+"/config/my.php"
inplace_change(filex, a, b)
