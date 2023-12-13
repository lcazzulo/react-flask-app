import time
import socketio

def run_app():

    sio = socketio.Client()

    @sio.event
    def connect():
        print("I'm connected!")
        
    @sio.event
    def connect_error():
        print("The connection failed!")


    @sio.on('temperature')
    def on_message(data):
        print('temperuture ', data['x'], data['t'])
        
    sio.connect('http://localhost:3000')
    sio.emit('join', '')
    while True:
        time.sleep(10)
        print('alive')

if __name__ == '__main__':
    run_app()