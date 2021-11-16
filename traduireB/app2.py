from flask import Flask, render_template, redirect, url_for, request
from random import randint
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm 
import os
import base64
from flask_migrate import Migrate
from flask_cors import CORS
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from flask_sqlalchemy  import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask import json, jsonify, request

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config['SECRET_KEY'] = 'Thisissupposedtobesecret!'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
bootstrap = Bootstrap(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
CORS(app)


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    email = db.Column(db.String(50), unique=True)
    cards = db.Column(db.JSON, nullable=True)
    password = db.Column(db.String())
    cardlist = db.Column(db.ARRAY(db.String), default=[])

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    data = request.headers.get('Authorization')
    userInfo = data.split(" ")[1]
    b64_str = userInfo.encode('ascii')
    b64_bytes = base64.b64decode(b64_str)
    decode_str = b64_bytes.decode('ascii')
    decode_str = decode_str.split(":")
    username = decode_str[0]
    password = decode_str[1]
    user = User.query.filter_by(username=username).first()
    if user:
        if check_password_hash(user.password, password):
            login_user(user)
            user_dict = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }
            return jsonify("You are logged in", user_dict)

    return jsonify("Invalid")
  

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    data = request.data
    user_dict = json.loads(data.decode('UTF-8'))
    
    hashed_password = generate_password_hash(user_dict['password'], method='sha256')
    new_user = User(username=user_dict['username'], email=user_dict['email'], password=hashed_password)
    db.session.add(new_user) 
    db.session.commit()
  
    return 'You like that?'
    
@app.route('/cards', methods=['POST'])
# @login_required
def cards():
    all_cards = []
    data = request.data
    card_dict = json.loads(data.decode('UTF-8'))
    id = card_dict['cards']['userId']
    user = User.query.get_or_404(id)
    all_cards.append([str(card_dict['cards']['cardId']), card_dict['cards']['translated'], card_dict['cards']['starterWord']])
    user.cardlist = user.cardlist + all_cards
    db.session.add(user) 
    db.session.commit()
    return  jsonify('Adding card to database')

@app.route('/getCards<id>', methods=['GET', 'POST'])
# @login_required
def getCards(id):
    print("getting cards")
    user = User.query.get_or_404(id)
    print(user.cardlist)
    return jsonify(user.cardlist)

@app.route('/update<id>', methods=['PUT'])
# @login_required
def updateUser(id):
    data = request.data
    user_dict = json.loads(data.decode('UTF-8'))
    id = user_dict['userId']
    username = user_dict['username']
    email = user_dict['email']
    user = User.query.get_or_404(id)
    user.username = username
    user.email = email
    print(user_dict)
    db.session.add(user) 
    db.session.commit()
    return jsonify("Updating user", user_dict)

@app.route('/delete<id>', methods=['DELETE'])
# @login_required
def deleteUser(id):
    data = request.data
    user_dict = json.loads(data.decode('UTF-8'))
    id = user_dict['userId']
    user = User.query.get_or_404(id)
    db.session.delete(user) 
    db.session.commit()
    print('deleteing user ', user_dict)
    return jsonify("Deleting user", user_dict)

@app.route('/delete/card<id>', methods=['DELETE'])
# @login_required
def deleteCard(id):
    data = request.data
    card_dict = json.loads(data.decode('UTF-8'))
    id = card_dict['cardId']
    user_id = card_dict['userId']
    user = User.query.get_or_404(user_id)
    user.cardlist = [card_id for card_id in user.cardlist if card_id[0] != id]
    
    print("NEW CARD LIST")
    print(user.cardlist)
    db.session.commit()
    return jsonify("Deleting user", card_dict)


@app.route('/updateCard/card<id>', methods=['PUT'])
# @login_required
def updateCard(id):
    data = request.data
    card_dict = json.loads(data.decode('UTF-8'))
    id = card_dict['cardId']
    user_id = card_dict['userId']
    user = User.query.get_or_404(user_id)
    print(card_dict)
    db.session.commit()
    return jsonify("Updating Card", card_dict)


@app.route('/logout', methods=['GET', 'POST'])
# @login_required
def logout():
    print("logged out")
    logout_user()
    return jsonify("Logged out")

if __name__ == '__main__':
    app.run(debug=True)