#!/usr/bin/python3

import mysql.connector
import socket

def get_host_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    finally:
        s.close()

    return ip

mydb = mysql.connector.connect(
  host="localhost",
  user="esbcwp_blog9_admin",
  passwd="esbcwp_blog9_happy",
  database="esbcwp_blog9"
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
        for ystr in words:
                bstr=''.join(ystr)
                #print(bstr,'\n')
                pos1=bstr.find(str1, 0)
                if pos1>=0:
                        #print(bstr,'\n')
                        #s:90:"http://www.ilovemyheart.org/blog9/wp-content/uploads/2016/02/home_charity2_bgd_pattern.jpg"
                        w=bstr.split(":")
                        #print('w1=',w[0],'\n')
                        #print('w2=',w[1],'\n')
                        #print('w3=',w[2],'\n')
                        #print('w3=',w[3],'\n')
                        w[3]=w[3].replace(str1, str2)
                        w[1]=len(w[3])
                        bstr=w[0]+":"+str(w[1])+":"+w[2]+":"+w[3]
                        print(bstr,'\n')
                outstr += bstr + ";"
        print(outstr,'\n')
#UPDATE wp_options SET option_value='wp-content/uploads' WHERE option_name='upload_path'"
sqlstr="update wp_options set option_value='"+outstr+"' where option_name='betheme'"
print(sqlstr,'\n')
#mycursor.execute(sqlstr)

mydb.close()
