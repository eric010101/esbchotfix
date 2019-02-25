#!/usr/bin/python3
import sys
clientarr=sys.argv
fname=clientarr[1]
pw=clientarr[2]

f = open(fname, "w")
f.write(pw)
# Close opend file
f.close()
