from flask import Flask

import sqlite3

app = Flask(__name__, static_url_path='')
dataCon = sqlite3.connect('database.db')

def get_user_data(dataCon):
    cursor = dataCon.cursor()
    cursor.execute("SELECT * FROM user")
    return cursor.fetchall()


@app.route('/')
def hello_world():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run()
    