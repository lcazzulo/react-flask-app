import time
from flask import Flask
from flask_socketio import SocketIO, emit, join_room, leave_room, send
import json
import sqlite3
import jsonpickle

from book import Book

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")
#socketio = SocketIO(app, message_queue='amqp://')
#db_path = '/home/luca/react-flask-app/db/test.db'
db_path = 'C:\\dev\\react-flask-app\\db\\test.db'

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/get_books')
def get_books():
    with sqlite3.connect(db_path) as con:
        cur = con.cursor()
        cur.execute("SELECT * FROM bookstore")
        data = cur.fetchall()
        ret = []
        for row in data:
            ret.append(Book(row[0], row[1], row[2], row[3], row[4]))
        return jsonpickle.encode(ret)


@socketio.on('create-something')
def handle_message(data):
    print('received message: ' + data)
    obj = {}
    obj['x'] = int(time.time() * 1000)
    obj['t'] = float(data)
    emit('foo', obj)


@socketio.on('temperature')
def handle_logs(data):
    print('temperature')
    emit('temperature', data, to='temperature')
    #send(data, to='temperature')
    
@socketio.on('join')
def on_join(data):
    print('join room')
    join_room('temperature')
    #send(username + ' has entered the room.', to=room)

if __name__ == '__main__':
    socketio.run(app)


