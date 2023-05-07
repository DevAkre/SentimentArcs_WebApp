from flask_sqlalchemy import SQLAlchemy
import random
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    token = db.Column(db.Integer, unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username
    
    def __init__(self,username, password):
        self.username = username
        self.password = password
        self.token = random.randint(0, 2**31 - 1)
        
    def generate_access_token(self):
        self.token = random.randint(0, 2**31 - 1)

class Model(db.Model):
    model_id = db.Column(db.Integer, primary_key=True)
    model_name = db.Column(db.String(80), unique=True, nullable=False)
    family = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    text_id = db.Column(db.Integer, db.ForeignKey('text.text_id'), nullable=False)

    def __repr__(self):
        return '<Model %r>' % self.name
    
    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id

class Text(db.Model):
    text_id = db.Column(db.Integer, primary_key=True)
    date_uploaded = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    size = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(80), nullable=False)
    author = db.Column(db.String(80), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    filename = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<Text %r>' % self.text
    
    def serialize(self):
        return {
            'text_id': self.text_id,
            'date_uploaded': self.date_uploaded,
            'size': self.size,
            'title': self.title,
            'author': self.author,
            'user_id': self.user_id,
            'filename': self.filename
        }
    
    def __init__(self, title, author, user_id, size, filename ):
        self.title = title
        self.author = author
        self.user_id = user_id
        self.filename = filename
        self.size = size

class Clean_Text(db.Model):
    clean_text_id = db.Column(db.Integer, primary_key=True)
    date_processed = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    text_id = db.Column(db.Integer, db.ForeignKey('text.text_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    options = db.Column(db.String(512), nullable=False)
    filename = db.Column(db.String(120), nullable=False)

    def options_List(self):
        return self.options.split(',')

    def __repr__(self):
        return '<Cleaned_Text %r>' % self.text
    
    def serialize(self):
        return {
            'clean_text_id': self.clean_text_id,
            'date_processed': self.date_processed,
            'text_id': self.text_id,
            'user_id': self.user_id,
            'options': self.options_List()
        }

    def __init__(self, text_id, user_id, options):
        datetime_str = datetime.now().strftime('%Y%m%d-%H%M%S')
        self.filename = str(self.clean_text_id) + '_' + str(text_id) + '_' + str(user_id)+ datetime_str + '.txt'
        self.text_id = text_id
        self.user_id = user_id
        if(type(options) == list):
            self.options = ','.join(options)
        elif(type(options) == str):
            self.options = options
        else:
            raise TypeError('options must be a list or a string')
        