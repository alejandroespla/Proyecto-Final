from flask import Flask, request, jsonify, Blueprint
from api.database.db import db
from api.models.User import User
import bcrypt
from flask_cors import CORS

api_user = Blueprint("api/user", __name__)
CORS (api_user)

@api_user.route('/register', methods=['POST'])
def register_user():

    body = request.get_json()
    print(body)

    new_pass= bcrypt.hashpw(body["password"].encode(), bcrypt.gensalt())

    new_user = User()
    new_user.email = body["email"]
    new_user.password = new_pass.decode()
    new_user.is_active = True
    new_user.fullname = body["fullname"]
    new_user.username = body["username"]

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Desde el user.py"}), 200