# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

import os
from   flask_migrate import Migrate
from   flask_minify  import Minify
from flask import Flask, request
from   sys import exit

import requests
from apps.config import config_dict
from apps import create_app, db
from joystick import joystick_thread, kill_joystick, get_ip_rasp
from Brasmaitre import lance_bras_maitre


# WARNING: Don't run with debug turned on in production!
DEBUG = (os.getenv('DEBUG', 'False') == 'True')

# The configuration
get_config_mode = 'Debug' if DEBUG else 'Production'

try:

    # Load the configuration using the default values
    app_config = config_dict[get_config_mode.capitalize()]

except KeyError:
    exit('Error: Invalid <config_mode>. Expected values [Debug, Production] ')

app = create_app(app_config)
Migrate(app, db)

if not DEBUG:
    Minify(app=app, html=True, js=False, cssless=False)
    
if DEBUG:
    app.logger.info('DEBUG            = ' + str(DEBUG)             )
    app.logger.info('Page Compression = ' + 'FALSE' if DEBUG else 'TRUE' )
    app.logger.info('DBMS             = ' + app_config.SQLALCHEMY_DATABASE_URI)
    app.logger.info('ASSETS_ROOT      = ' + app_config.ASSETS_ROOT )

@app.route('/post-commande', methods=['POST'])
def handle_post_request_commande():
 
    data = request.get_json()
    print('data' + str(data))
    if data != None:
        if data['mode'] == "vitesse":
            try:   
                kill_joystick()
            except Exception as e:
                print(str(e))
            joystick_thread(0.05,'vitesse')
            joystick_thread(0.05,'vitesse')
            print("Restart Joystick vitesse")
        elif data['mode'] == "articulation":
            try:   
                kill_joystick()
            except Exception as e:
                print(str(e))
            joystick_thread(0.05,'articulation')
            joystick_thread(0.05,'articulation')
            print("Restart Joystick articulation")
        elif data['mode'] == "joystick":
            print("Restart Joystick")
        else:
            kill_joystick()
            print("stop joystick")
        return 'Received POST request'
    return 'error'

@app.route('/post-ip', methods=['POST'])
def handle_post_request_IP():
 
    dataip = request.get_json()
    if dataip != None:
        print("IP RASP : "+ dataip['ip'])
        get_ip_rasp(dataip['ip'])
        return 'Received POST IP request'
    return 'error'

@app.route('/post-bras-maitre', methods=['POST'])
def handle_post_request_Bras_maitre():
    data_bras = request.get_json()
    if data_bras != None:
        lance_bras_maitre()
        return 'Received POST bras maitre request'
    return 'error'



if __name__ == "__main__":
    app.run()
    