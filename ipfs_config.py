#!/usr/bin/python3
import sys
	
#blogarr=sys.argv
#inputfile=blogarr[1]
#print('blog name =',blogn)

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
        
a='"Gateway": "/ip4/127.0.0.1/tcp/8080"'
b='"Gateway": "/ip4/0.0.0.0/tcp/8080"'
filex='/root/.ipfs/config'
inplace_change(filex, a, b)

#write files
#write ipfs2bc.sh
str = ['#!/bin/bash','cd ipfs2bc','sudo expect ipfs2bc.pl','npm install moment --save',
'npm install --save ipfs-http-client','npm install express --save','npm install fs --save','npm install multer --save','npm install body-parser --save','npm install baidu-aip-sdk --save']

# Open a file
fo = open("ipfs2bc.sh", "w")
for i in range(0,11):
	fo.write(str[i]+"\n")

# Close opend file
fo.close()
