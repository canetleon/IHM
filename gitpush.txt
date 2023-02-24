# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

import os
from   flask_migrate import Migrate
from   flask_minify  import Minify
from flask import Flask

from   sys import exit

from apps.config import config_dict
from apps import create_app, db


import threading
import pygame


class JoystickThread(threading.Thread):
    def __init__(self):
        os.environ["SDL_VIDEODRIVER"] = "dummy"

        pygame.init()
        pygame.joystick.init()
        joyController = pygame.joystick.Joystick(0)
        joyController.init()
        
    def run(self):
        while True:
            for event in pygame.event.get():
                if event.type == pygame.JOYAXISMOTION:
                    print(event)
                    pass
                elif event.type == pygame.JOYBUTTONDOWN:
                    #print(event)
                    pass
                elif event.type == pygame.JOYBUTTONUP:
                    #print(event)
                    pass

if __name__ == '__main__':
    joystick_thread = JoystickThread()
    joystick_thread.start()

    # Do other things in the main thread while joystick events are being monitored in the separate thread

    print("Main thread started") 
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

    app = Flask(__name__)
    app.secret_key = 'test1234'

    if __name__ == "__main__":
        app.run()

    print("Main thread finished") 
    while True:
        pass
