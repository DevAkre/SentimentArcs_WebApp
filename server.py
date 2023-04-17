from flask import Flask, request
from models import db, User, Text
import os
import json
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}
# create the app
app = Flask(__name__, static_url_path='')
#init config
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#make upload folder if it doesn't exist
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER']), exist_ok=True)
db.init_app(app)

with app.app_context():
    db.create_all()
    db.session.commit()

def get_user_from_token(given_token):
    return User.query.filter_by(token=given_token).first()

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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
    return {}

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
            "error": "Username already taken"
        }

@app.post('/api/text/upload')
def text_upload():
    user = get_user_from_token(request.form.get("token"))
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        print(user.username + " upload attempted!")
        if 'file' not in request.files:
            return {"success": False, "error": "No valid file selected"}
        file = request.files.get('file')
        if file.filename == '':
            return {"success": False, "error": "No selected file"}
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            while(os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], filename))):
                filename = "copy_of_" + filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            file_size = os.path.getsize(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            text = Text(request.form.get("title"), request.form.get("author"), user.user_id, file_size, filename)
            db.session.add(text)
            db.session.commit()
            return {"success": True}
        
@app.post('/api/text/delete')
def text_delete():
    user = get_user_from_token(request.form.get("token"))
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        print(user.username + " delete attempted!")
        text = Text.query.filter_by(text_id=request.form.get("text_id")).first()
        if(text is None):
            return {"success": False, "error": "Invalid text id"}
        else:
            if(text.user_id != user.user_id):
                return {"success": False, "error": "You do not own this text"}
            else:
                db.session.delete(text)
                db.session.commit()
                return {"success": True}

@app.post('/api/text/list')
def text_list():
    request_data = request.get_json()
    user = get_user_from_token(request_data["token"])
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        print("fetching list for user "+ user.username)
        print(user.username + " list attempted!")
        texts = Text.query.filter_by(user_id=user.user_id).order_by(Text.date_uploaded.desc()).all()
        if(texts is None):
           return {"success": False, "error": "No texts found"}
        textList = []
        for text in texts:
            textList.append({"text_id":text.text_id, "date_uploaded":text.date_uploaded, "size":text.size, "title": text.title, "author" : text.author, "filename":text.filename})
        return {"success": True, "texts": json.dumps(textList, default = str)}
    


if __name__ == '__main__':
    app.run()