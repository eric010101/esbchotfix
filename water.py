#!/usr/bin/env python

import mysql.connector
import paho.mqtt.client as mqtt
import time
#import web3
import json
import requests
import datetime
import pytz

tz = pytz.timezone('Asia/Shanghai') #东八区
#from web3.auto import w3

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    #client.subscribe("Plant-1/Data/Count/#")
    client.subscribe("Plant-1/#")

def on_message(client, userdata, msg):
    #print(msg.topic+" "+str(msg.payload))
    #print(w3.eth.blockNumber)

    data = str(msg.payload)
    print(data)
    #return 1
    #db = mysql.connector.connect("localhost","ESBCadmin","ESBChappy","esbc_water")
    db = mysql.connector.connect(
       host="localhost",
       user="ESBCadmin",
       passwd="ESBChappy",
       database="esbc_water"
    )
    cursor = db.cursor()
    numdatastr = data.split(",")
    #print(numdatastr[0])
    #print(numdatastr[1])
    #print(numdatastr[2])
    #print(numdatastr[3])
    #print(numdatastr[4])
    #print(numdatastr[5])
    #print(numdatastr[6])
    #print(numdatastr[7])
    numdata1 = numdatastr[0][3:]
    numdata2 = numdatastr[1][0:]
    numdata3 = numdatastr[2][5:]
    numdata4 = numdatastr[3][5:]
    numdata5 = numdatastr[4][4:]
    numdata6 = numdatastr[5][4:]
    numdata7 = numdatastr[6][6:]
    numdata8 = numdatastr[7][5:-1]
    print(numdata1)
    print(numdata2)
    print(numdata3)
    print(numdata4)
    print(numdata5)
    print(numdata6)
    print(numdata7)
    print(numdata8)
    timenow=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
    if numdata8 == "12345678" :
        numdata2=datetime.datetime.fromtimestamp(int(time.time()), pytz.timezone('Asia/Shanghai')).strftime('%Y-%m-%d %H:%M:%S')
    # MySQL EXECUTION
    try:
        sqlquery = "INSERT INTO `WLB` (id,Rtime,TDS1,TDS2,COD,TOC,UV254,flow,RecordTime) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        print(sqlquery)
        val = (numdata1,numdata2,numdata3,numdata4,numdata5,numdata6,numdata7,numdata8,timenow)
        print(val)
        cursor.execute(sqlquery,val)
        db.commit() #commit the insert
        print("insert OK")
        cursor.close()  #close the cursor
        url = 'http://localhost/phpweb3/esbc_public/water4.php'
        r = requests.get(url)
        #r.text
        print(r.text)
    except MySQLdb.IntegrityError:
        print("failed to insert data")
    finally:
        cursor.close()  #close just incase it failed

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("149.28.152.45", 1883, 100)

client.loop_forever()


