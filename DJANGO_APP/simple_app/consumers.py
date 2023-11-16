from random import randint
from channels.generic.websocket import WebsocketConsumer, JsonWebsocketConsumer
from datetime import datetime # New line
import time # New line
import threading # New line
from django.template.loader import render_to_string

class EchoConsumer(WebsocketConsumer):
    def connect(self):
        """Event when client connects"""
        # Informs client of successful connection
        self.accept()
        # Send message to client
        self.send(text_data="You are connected by WebSockets!")

        def send_time(self):
            while True:
                # Send message to client
                self.send(text_data=str(datetime.now()))
                # Sleep for 1 second
                time.sleep(1)
        # threading.Thread(target=send_time, args=(self,)).start()

    def disconnect(self, close_code):
        """Event when client disconnects"""
        pass
    def receive(self, text_data):
        """Event when data is received"""
        pass



class BingoConsumer(JsonWebsocketConsumer):

    def connect(self):
        self.accept()

            ## Send numbers to client
        # Generates numbers 5 random numbers, approximately, between 1 and 10
        random_numbers = list(set([randint(1, 10) for _ in range(5)]))
        message = {
        'action': 'New ticket',
        'ticket': random_numbers
        }
        self.send_json(content=message)
        def send_ball(self):
            while True:
                random_balls = randint(1,10)
                message = {
                    'action': 'New ball',
                    'ball': random_balls,
                }
                self.send_json(content=message)
                time.sleep(1)

        threading.Thread(target=send_ball,args=(self,)).start()


    def disconnect(self, close_code):
        """Event when client disconnects"""
        pass
    def receive_json(self, data):
        """Even"""
        pass


class BMIConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()
        pass
    def disconnect(self):
        pass
    def receive_json(self, data):
        height = (int(data['height']) / 100)
        weight = int(data['weight'])
        bmi = round(weight / height ** 2, 1)
        self.send_json(content={
            "action": "BMI result",
            "html": render_to_string("components/_bmi_result.html",{"height": height, "weight": weight, "bmi": bmi})
        })
        pass
