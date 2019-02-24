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
def inplace_change(filename, old_string, new_string,outfilename):
    # Safely read the input filename using 'with'
    with open(filename) as f:
        s = f.read()
        if old_string not in s:
            print(old_string,"not found in ",filename)
            return

    # Safely write the changed content, if found in the file
    with open(outfilename, 'w') as f:
        print('Changing ',old_string, ' to ',new_string,' in ',outfilename)
        s = s.replace(old_string, new_string)
        f.write(s)


clientarr=sys.argv
client=clientarr[1]
clientdir =clientarr[2]
a="ChainMaker Explorer - $ESBC_HEADTITLE$"
b="ChainMaker Explorer - "+client
filex="/root/explorer_index.php"
filey="/var/www/html/phpweb3/"+clientdir+"/index.php"
inplace_change(filex, a, b,filey)

a="$ESBC_HEADTITLE$"
b=client
filex="/root/header.php"
filey="/var/www/html/phpweb3/"+clientdir+"/header.php"
inplace_change(filex, a, b,filey)