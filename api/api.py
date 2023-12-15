import time
from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room, leave_room, send
import json
import sqlite3
import jsonpickle

from book import Book
from temperature_sample import TemperatureSample

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")
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
    
@app.route('/api/add_book', methods = ['PUT'])
def add_book():
    req_json = request.get_json()
    author = req_json['author']
    title = req_json['title']
    isbn = req_json['isbn']
    notes = req_json['notes']
    print('author: ' + author)
    print('title: ' + title)
    print('isbn: ' + isbn)
    print('notes: ' + notes)
    with sqlite3.connect(db_path) as conn:
        sql = ''' INSERT INTO bookstore(author, title, isbn, notes) VALUES(?,?,?,?) '''
        cur = conn.cursor()
        rec = (author, title, isbn, notes)
        cur.execute(sql, rec)
        conn.commit()
    return 'OK'

@app.route('/api/update_book', methods = ['POST'])
def edit_book():
    req_json = request.get_json()
    book_id = req_json['book_id']
    author = req_json['author']
    title = req_json['title']
    isbn = req_json['isbn']
    notes = req_json['notes']
    print('book_id: ' + str(book_id))
    print('author: ' + author)
    print('title: ' + title)
    print('isbn: ' + isbn)
    print('notes: ' + notes)
    with sqlite3.connect(db_path) as conn:
        sql = ''' UPDATE bookstore SET author=?, title=?, isbn=?, notes=? WHERE book_id=? '''
        cur = conn.cursor()
        rec = (author, title, isbn, notes, book_id)
        cur.execute(sql, rec)
        conn.commit()
    return 'OK'

@app.route('/api/delete_book', methods = ['DELETE'])
def delete_book():
    req_json = request.get_json()
    book_id = req_json['book_id']
    print('book_id: ' + str(book_id))
    with sqlite3.connect(db_path) as conn:
        sql = ''' DELETE FROM bookstore WHERE book_id=? '''
        cur = conn.cursor()
        rec = (book_id,)
        cur.execute(sql, rec)
        conn.commit()
    return 'OK'

@app.route('/api/get_temperatures')
def get_temperatures():
    with sqlite3.connect(db_path) as con:
        cur = con.cursor()
        cur.execute("SELECT * FROM temperatures")
        data = cur.fetchall()
        ret = []
        for row in data:
            ret.append(TemperatureSample(row[0], row[1]))
        return jsonpickle.encode(ret, unpicklable=False)


@socketio.on('temperature')
def handle_temperature(data):
    print('temperature')
    emit('temperature', data, to='temperature')
    
    
@socketio.on('join')
def on_join(data):
    print('join room')
    join_room('temperature')
    

if __name__ == '__main__':
    socketio.run(app)


