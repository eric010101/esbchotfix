#!/usr/bin/python3

import mysql.connector
import socket
import sys


def get_host_ip():
	try:
		s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
		s.connect(('8.8.8.8', 80))
		ip = s.getsockname()[0]
	finally:
		s.close()

	return ip
	
blogarr=sys.argv
#print('len=',len(blog))
#for i in range(0,len(blog)):
#  print('blog=', blog[i])
blogn=blogarr[1]
print('blog name =',blogn)
#print('Number of arguments:', len(sys.argv), 'arguments.')
#print('Argument List:', str(sys.argv))



user1="esbcwp_"+blogn+"_admin"
passwd1="esbcwp_"+blogn+"_happy"
database1="esbcwp_"+blogn

constr='host="localhost",user="'+user1+'",passwd="'+passwd1+'",database="'+database1+'"'
print('constr=',constr)

#mydb = mysql.connector.connect(constr)

mydb = mysql.connector.connect(
  host="localhost",
  user=user1,
  passwd=passwd1,
  database=database1
)

mycursor = mydb.cursor()
sqlstr="select option_value from wp_options where option_name='betheme'"
mycursor.execute(sqlstr)
myresult = mycursor.fetchall()
str1="www.ilovemyheart.org"
len1=len(str1)
str2=get_host_ip()
print(str2)
len2=len(str2)
lendiff=len1-len2
outstr=""
astr=""
for xstr in myresult:
	#print(xstr,'\n\n')
	astr=''.join(xstr)
	print(astr,'\n\n')
	words=astr.split(";")   
	for i in range(0,len(words)-2):
		bstr=''.join(words[i])
		#print(bstr,'\n')
		pos1=bstr.find(str1, 0)
		if pos1>=0: #字串中有http://
			bstr=bstr.replace(str1, str2)
			#print(bstr,'\n')
			#s:90:"http://www.ilovemyheart.org/blog9/wp-content/uploads/2016/02/home_charity2_bgd_pattern.jpg"
			w=bstr.split(':"')
			#print('w0=',w[0],'\n')
			#print('w1=',w[1],'\n')
			s=w[0].split(':')
			#print('s0=',s[0],'\n')
			#print('s1=',s[1],'\n')
			s[1]=len(w[1])-1
			mstr=""
			bstr=s[0]+':'+str(s[1])+':"'+w[1]
			#print(bstr,'\n')
		#end if
		outstr += bstr + ";"
		#print(outstr,'\n')
	#next
	bstr=''.join(words[len(words)-2])
	outstr += bstr+";"
	#print('last2=',bstr,'\n')
	bstr=''.join(words[len(words)-1])
	outstr += bstr
	#print('last1=',bstr,'\n')
	#outstr += bstr
#next
print(outstr,'\n')
#UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
sqlstr="update wp_options set option_value='"+outstr+"' where option_name='betheme'"
print(sqlstr,'\n')
mycursor.execute(sqlstr)
mydb.close()
