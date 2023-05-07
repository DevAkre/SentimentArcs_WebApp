from flask import Flask, request, send_file, send_from_directory
from models import db, User, Text, Clean_Text, Model
#SentimentArcsPackage
import imppkg.simplifiedSA as SA
import os
import csv
import json
import pandas as pd
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'uploads'
DATA_FOLDER = 'data'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}
# create the app
app = Flask(__name__, static_url_path='')
#init config
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["DATA_FOLDER"] = DATA_FOLDER
#make upload folder if it doesn't exist
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER']), exist_ok=True)
os.makedirs(os.path.join(app.config['DATA_FOLDER'], 'clean_text'), exist_ok=True)
os.makedirs(os.path.join(app.config['DATA_FOLDER'], 'model'), exist_ok=True)

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

    if(result.token and "token" in request_data and result.token == request_data['token']):
        print(request_data["username"] + " access token accepted!")
        return {
            "success": True,   
        }

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
    #todo properly
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

#POST request gives user token and a valid file
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
            return {"success": True, "text": text.serialize()}

#POST request gives user token and text_id
@app.post('/api/text/delete')
def text_delete():
    request_data = request.get_json()
    user = get_user_from_token(request_data["token"])
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        text = Text.query.filter_by(text_id=request_data["text_id"]).first()
        if(text is None):
            return {"success": False, "error": "Invalid text id"}
        else:
            if(text.user_id != user.user_id):
                return {"success": False, "error": "You do not own this text"}
            else:
                #delete file from storage
                try:
                    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], text.filename))
                except:
                    print("Error: file not found")

                #delete all clean text with this text_id
                clean_texts = Clean_Text.query.filter_by(text_id=text.text_id).delete()
                #delete text from database
                db.session.delete(text)
                db.session.commit()
                return {"success": True}

#POST request request gives user token
@app.post('/api/text/list')
def text_list():
    request_data = request.get_json()
    user = get_user_from_token(request_data["token"])
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        print("fetching list for user "+ user.username)
        print(user.username + " list retrieval attempted!")
        texts = Text.query.filter_by(user_id=user.user_id).order_by(Text.date_uploaded.desc()).all()
        if(texts is None):
           return {"success": False, "error": "No texts found"}
        textList = [text.serialize() for text in texts]
        return {"success": True, "texts": json.dumps(textList, default = str)}

#POST request request gives user token and text_id
@app.post('/api/text/download')
def text_download():
    request_data = request.get_json()
    user = get_user_from_token(request_data["token"])
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        print(user.username + " download attempted!")
        text = Text.query.filter_by(text_id=request_data["text_id"]).first()
        if(text is None):
            return {"success": False, "error": "Invalid text id"}
        else:
            if(text.user_id != user.user_id):
                return {"success": False, "error": "You do not own this text"}
            else:
                print("File sent.")
                return send_from_directory(app.config['UPLOAD_FOLDER'], text.filename, as_attachment=True)
            

@app.post('/api/clean_text/list')
def clean_text_list():
    request_data = request.get_json()
    print(request_data)
    user = get_user_from_token(request_data["token"])
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        text = Text.query.filter_by(text_id=request_data["text_id"]).first()
        if(text is None):
           return {"success": False, "error": "Invalid text"}
        print(user.username + " clean text list retrieval attempted!")
        texts = Clean_Text.query.filter_by(user_id=user.user_id, text_id= text.text_id).order_by(Clean_Text.date_processed.desc()).all()
        if(texts is None):
           return {"success": False, "error": "No clean texts found"}
        textList = []
        for text in texts:
            textList.append({"clean_text_id":text.clean_text_id, "date_processed":text.date_processed, "options":text.options})
        return {"success": True, "cleanTexts": json.dumps(textList, default = str)}
    
@app.post('/api/clean_text/delete')
def clean_text_delete():
    request_data = request.get_json()
    user = get_user_from_token(request_data["token"])
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        text = Clean_Text.query.filter_by(clean_text_id=request_data["clean_text_id"]).first()
        if(text is None):
            return {"success": False, "error": "Invalid clean text id"}
        else:
            if(text.user_id != user.user_id):
                return {"success": False, "error": "You do not own this text"}
            else:
                #delete file from storage
                try:
                    os.remove(os.path.join(app.config['DATA_FOLDER'], 'clean_text', text.filename))
                except:
                    print("Error: file not found")
                #delete text from database
                db.session.delete(text)
                db.session.commit()
                return {"success": True}
        
@app.post('/api/clean_text/create')
def clean_text_create():
    request_data = request.get_json()
    user = get_user_from_token(request_data["token"])
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        text = Text.query.filter_by(text_id=request_data["text_id"]).first()
        if(text is None):
            return {"success": False, "error": "Invalid text id"}
        else:
            if(text.user_id != user.user_id):
                return {"success": False, "error": "You do not own this text"}
            else:
            
                #create cleaned text object
                clean_text = Clean_Text(text.text_id, user.user_id, request_data["options"])
                #check if clean text already exists
                temp = Clean_Text.query.filter_by(text_id=clean_text.text_id, options=clean_text.options).first()
                if(temp is not None):
                    return {"success": False, "error": "Clean text already exists"}
                #create clean text file
                with open(os.path.join(app.config['UPLOAD_FOLDER'], text.filename), 'r') as f:
                    text_str = f.read()
                segmented_text = SA.segment_sentences(text_str)
                clean_df = SA.create_clean_df(segmented_text, text.filename)
                
                #save file
                clean_df.to_csv(os.path.join(app.config['DATA_FOLDER'], 'clean_text', clean_text.filename), index=False)
                #save to database
                db.session.add(clean_text)
                db.session.commit()
                return {"success": True, "cleanText": clean_text.serialize()}

@app.post('/api/clean_text/preview')
def clean_text_preview():
    request_data = request.get_json()
    user = get_user_from_token(request_data["token"])
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        text = Clean_Text.query.filter_by(clean_text_id=request_data["clean_text_id"]).first()
        if(text is None):
            return {"success": False, "error": "Invalid clean text id"}
        else:
            if(text.user_id != user.user_id):
                return {"success": False, "error": "You do not own this text"}
            else:
                #send first 5, middle 5 and last 5 sentences of cleaned_text
                first5 = []
                middle5 = []
                last5 = []
                num = request_data["num"];
                with open(os.path.join(app.config['DATA_FOLDER'], 'clean_text',  text.filename), 'r') as csvfile:
                    reader = csv.reader(csvfile)
                    row_count = sum(1 for row in reader)
                    csvfile.seek(0)
                    i = 0
                    for row in (reader):
                        if(0<i<num+1):
                            first5.append(row)
                        elif((row_count-num)/2<i<(row_count+num)/2+1):
                            middle5.append(row)
                        elif(row_count-(num+1)<i<row_count):
                            last5.append(row)
                        i+=1
                return {"success": True, "preview": [first5, middle5, last5]}

@app.post('/api/model/list')
def model_list():
    request_data = request.get_json()
    user = get_user_from_token(request_data["token"])
    clean_text = Clean_Text.query.filter_by(clean_text_id=request_data["clean_text_id"]).first()
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        models = Model.query.filter_by(user_id=user.user_id, clean_text_id = clean_text.clean_text_id).all()
        if(models is None):
            return {"models": []}
        modelList = []
        for model in models:
            modelList.append(model.serialize())
        print(modelList)
        return {"models": json.dumps(modelList, default = str)}

#runs model on clean text asynchronously and sents back post response when done
@app.post('/api/model/run')
async def model_run():
    request_data = request.get_json()
    user = get_user_from_token(request_data["token"])
    model = request_data["model_name"]
    if(user is None):
        return {"success": False, "error": "Invalid token"}
    else:
        clean_text = Clean_Text.query.filter_by(clean_text_id=request_data["clean_text_id"]).first()
        if(clean_text is None):
            return {"success": False, "error": "Invalid clean text id"}
        else:
            if(clean_text.user_id != user.user_id):
                return {"success": False, "error": "You do not own this text"}
            else:
                #check if model already exists
                temp = Model.query.filter_by(clean_text_id=clean_text.clean_text_id, model_name=model).first()
                if(temp is not None):
                    return {"success": False, "error": "Model already exists"}
                #read clean text file
                clean_text_df = pd.read_csv(os.path.join(app.config['DATA_FOLDER'], 'clean_text', clean_text.filename))
                #run model
                model_df = None
                print("Attempting model: " + model)
                if(model == "Vader"):
                    model_df = SA.vader(clean_text_df, clean_text.filename)
                elif(model == "TextBlob"):
                    model_df = SA.textblob(clean_text_df, clean_text.filename)
                elif(model == "DistilBERT"):
                    model_df = SA.distilbert(clean_text_df, clean_text.filename)
                else:
                    model_df = None
                if(model_df is None):
                    return {"success": False, "error": "Invalid model"}
                
                #save file
                print(model_df)
                modelObj = Model(model, clean_text.clean_text_id, user.user_id)
                db.session.add(modelObj)
                model_df.to_csv(os.path.join(app.config['DATA_FOLDER'], 'model', modelObj.filename), index=False)
                db.session.commit()
                #send back response
                return {"success": True}

if __name__ == '__main__':
    app.run()

#list of all api endpoints
# user
#   /api/user/register
#   /api/user/login
#   /api/user/delete
#   /api/user/logout
# text
#   /api/text/upload
#   /api/text/delete
#   /api/text/download
# clean_text
#   /api/clean_text/create
#   /api/clean_text/delete
#   /api/clean_text/preview
