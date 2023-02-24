import requests
import threading
from time import sleep
import os
import pygame
import logging
import json

stop_joystick = False

def init_joystick(sensibilite):
        global stop_joystick
        logging.info("Sensibilite Joystick :"+ str(sensibilite))
        os.environ["SDL_VIDEODRIVER"] = "dummy"
        pygame.init()
        print("1")
        pygame.joystick.init()
        joyController = pygame.joystick.Joystick(0)
        joyController.init()
        logging.info("Thread : starting")
        print("2")
        headers = {'Content-Type': 'application/json', 'Accept':'application/json','Access-Control-Allow-Origin' : '*'}
        data_axis_old = {}
        for i in range(joyController.get_numaxes()):
                                        data_axis_old[f'Axis {i}'] = joyController.get_axis(i)
        while True:
                events = pygame.event.get()
                if len(events)>0 :
                        if events[0].type == pygame.JOYAXISMOTION:
                                data_axis = {}
                                for i in range(joyController.get_numaxes()):
                                        data_axis[f'Axis {i}'] = round(joyController.get_axis(i), 4)
                                change = False
                                for axis in data_axis.keys():
                                        change = change or abs(data_axis[axis] - data_axis_old[axis]) > sensibilite
                                if change:
                                        r = requests.post("http://169.254.160.48:8000/com/joystick", data=json.dumps(data_axis), headers=headers)
                                        print(r.text)
                                data_axis_old = data_axis
                        elif events[0].type == pygame.JOYBUTTONDOWN:
                                event = events[0]
                                print(events)
                                r = requests.post("http://169.254.160.48:8000/com/joystick", data=json.dumps({"type" : "buttondown", "valeur" : event.dict}), headers=headers)
                                print(r.text)    
                        elif events[0].type == pygame.JOYBUTTONUP:
                                event = events[0]
                                r = requests.post("http://169.254.160.48:8000/com/joystick", data=json.dumps({"type" : "buttonup", "valeur" : event.dict}), headers=headers)
                                print(r.text) 
                
                if stop_joystick:
                        logging.info("Thread : stopping")
                        break
                sleep(0.3)  

"""
                for i in range(0 , len(events ),5):
                        event = events[i]
                        if event.type == pygame.JOYAXISMOTION: 
                                
                                r = requests.post("http://169.254.160.48:8000/com/joystick", data=json.dumps(event.dict), headers=headers)
                                print(r.text)

                                
                                
                                with open("event.txt",'a') as file :
                                        file.write(str(event.dict))
                                        pass
      
                       
                        
                      

                for i in range(joyController.get_numaxes()):
                        print(f'Axis {i}: {joyController.get_axis(i)}')
        """        

        #r = requests.post("http://159.31.121.161:3100/com/stockage")
        #r = requests.get("http://159.31.65.235:3100/com")
        #print(r.text)
        #sleep(2)

def joystick_thread(sensibilite = 0.05):
        global stop_joystick
        stop_joystick = False
        x = threading.Thread(target=init_joystick, args=[sensibilite])


        format = "%(asctime)s: %(message)s"
        logging.basicConfig(format=format, level=logging.INFO,
                                datefmt="%H:%M:%S")

        x.start()
        logging.info("controller started")

def kill_joystick():
        joyController = pygame.joystick.Joystick(0)
        global stop_joystick
        stop_joystick = True
        joyController.quit()

