#!/usr/bin/python3
import sys
import socket


def writefile(fname, fcontent, fstyle):
	f = open(fname, "w")
	f.write(strpw)
	# Close opend file
	f.close()
	return 1
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

def genesis(node1, node2, node3,node4):	
	a="$acc40node1$"
	b=node1
	filex="/root/genesis-1signer_template.json"
	filey="/root/genesis1.json"
	inplace_change(filex, a, b,filey)
	
	a="$acc40node2$"
	b=node2
	filex="/root/genesis1.json"
	filey="/root/genesis2.json"
	inplace_change(filex, a, b,filey)
	
	a="$acc40node3$"
	b=node3
	filex="/root/genesis2.json"
	filey="/root/genesis3.json"
	inplace_change(filex, a, b,filey)

	a="$acc40node4$"
	b=node4
	filex="/root/genesis3.json"
	filey="/root/genesis.json"
	inplace_change(filex, a, b,filey)
		
inputarr=sys.argv
int casestr = inputarr[1];
if casestr=="genesis":
	genesis(inputarr[2], inputarr[3], inputarr[4],inputarr[5])

elif casestr=="x2":

elif casestr=="x3":

else: