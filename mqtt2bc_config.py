#!/usr/bin/python3
import sys
str = ['#!/bin/bash','cd mqtt2bc','sudo expect mqtt2bc.pl','npm install moment --save',
'npm install mqtt --save','npm install mysql --save']
# Open a file
fo = open("mqtt2bc.sh", "w")
for i in range(0,10):
	fo.write(str[i]+"\n")
# Close opend file
fo.close()