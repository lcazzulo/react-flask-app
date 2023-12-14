import time
import socketio
import sqlite3
import queue

db_path = 'C:\\dev\\react-flask-app\\db\\test.db'
q = queue.Queue()

def insert_sample(conn, data):
    sql = ''' INSERT INTO temperatures(timestamp, temperature) VALUES(?,?) '''
    cur = conn.cursor()
    rec = (data['x'], data['t'])
    cur.execute(sql, rec)
    conn.commit()

def run_app():

    sio = socketio.Client()
    conn = sqlite3.connect(db_path)

    @sio.event
    def connect():
        print("I'm connected!")
        
    @sio.event
    def connect_error():
        print("The connection failed!")


    @sio.on('temperature')
    def on_message(data):
        print('temperuture ', data['x'], data['t'])
        q.put(data)
        
    sio.connect('http://localhost:5000', transports=['websocket'])
    sio.emit('join', '')
    while True:
        try:
            elem = q.get()
            insert_sample(conn, elem)
            print ('inserted ' + str(q.qsize()))
        except Exception as e:
            print (e)

if __name__ == '__main__':
    run_app()