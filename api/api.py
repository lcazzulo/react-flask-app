import time
from flask import Flask
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@socketio.on('create-something')
def handle_message(data):
    print('received message: ' + data)
    obj = {}
    obj['x'] = int(time.time() * 1000)
    obj['t'] = float(data)
    emit('foo', obj)


if __name__ == '__main__':
    socketio.run(app)


