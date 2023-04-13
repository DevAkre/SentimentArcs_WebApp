from flask import Flask, request
from models import db, User

# create the app
app = Flask(__name__, static_url_path='')
#init config
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)

with app.app_context():
    db.create_all()
    db.session.commit()

@app.route('/')
def serve_frontEnd():
    return app.send_static_file('index.html')

@app.post('/api/user/login')
def user_login():
    request_data = request.get_json();
    print(request_data["username"] + " login attempted!")
    result = db.one_or_404(
        db.select(User).filter_by(username=request_data['username']),
        description=f"No user named '{request_data['username']}'."
    )

    if(result.password == request_data['password']):
        result.generate_access_token()
        db.session.commit()
        print(request_data["username"] + " login successful!")
        return {
            "success": True,
            "access_token": result.token    
        }
    else:
        print(request_data["username"] + " login failed!")
        return {
            "success": False,
            "error": "Invalid password"
        }

@app.post('/api/user/logout')
def user_logout():
    return

@app.post('/api/user/register')
def user_register():
    request_data = request.get_json();
    print(request_data["username"] + " register attempted!")
    result = db.session.execute(
        db.select(User).filter_by(username=request_data['username'])
    ).fetchone()
    if(result is None):
        user = User(request_data['username'], request_data['password'])
        db.session.add(user)
        db.session.commit()
        print(request_data["username"] + " register successful!")
        return {
            "success": True
        }
    else:
        return {
            "success": False,
            "error": "Username already exists"
        }

if __name__ == '__main__':
    app.run()