from flask_sqlalchemy import SQLAlchemy
import random

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
        token = random.randint(0, 2**31 - 1)