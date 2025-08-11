from flask import Blueprint, request, jsonify
from api.database.db import db
from api.models.User import User
import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS

api_user = Blueprint("api_user", __name__)
CORS(api_user)

@api_user.route('/register', methods=['POST'])
def register_user():
    body = request.get_json()
    if not body:
        return jsonify({"error": "No data provided"}), 400

    email = body.get("email")
    password = body.get("password")
    fullname = body.get("fullname")
    username = body.get("username")

    if not email or not password or not fullname or not username:
        return jsonify({"error": "Faltan datos requeridos"}), 400

    # Verificar si el usuario ya existe
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email ya registrado"}), 409

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    new_user = User(
        email=email,
        password=hashed_password,
        is_active=True,
        fullname=fullname,
        username=username
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado correctamente"}), 201


@api_user.route('/user', methods=['GET'])
@jwt_required()
def get_logged_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(user.serialize()), 200


@api_user.route('/user', methods=['PUT'])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    fullname = data.get("fullname")
    username = data.get("username")

    if fullname:
        user.fullname = fullname.strip()
    if username:
        user.username = username.strip()

    db.session.commit()

    return jsonify({
        "message": "Usuario actualizado correctamente",
        "user": user.serialize()
    }), 200
