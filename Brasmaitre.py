import serial
import requests
import threading
from time import sleep, time
import os
import pygame
import logging
import json


def lance_bras_maitre():

    #global ip_rasp
    ip_rasp = "169.254.160.48"
    ser = serial.Serial('COM5', 9600, bytesize=8, timeout=2, stopbits=serial.STOPBITS_ONE)
    Phrase = []
    i = 0
    run = True

    ser.write(bytearray('Salutfrero', 'ascii'))

    while run:

        if ser.inWaiting() > 0:
            if i < 7:
                Phrase.append((ser.readline().decode('Ascii')).strip("\r\n"))
                i += 1

            elif i == 7:
                # Base: S1: S2: S3: S4: S5: Pince
                #print(Phrase)
                i = 0

                headers = {'Content-Type': 'application/json', 'Accept':'application/json','Access-Control-Allow-Origin' : '*'}
                data=json.dumps({"mode" : "bras_maitre", "valeur" : {"Base" : Phrase[0], "S1" : Phrase[1] , "S2" : Phrase[2] , "S3" : Phrase[3] , "S4" : Phrase[4] , "S5" : Phrase[5] , "Pince" : Phrase[6] }})
                r = requests.post("http://"+ip_rasp+":8000/com/joystick", data , headers=headers)
                print(data)

                Phrase.clear()
                run = False
                
def get_ip_rasp(ip):
                global ip_rasp
                ip_rasp = ip
                print('get ip rasp fct')
                return ip