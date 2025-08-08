from flask import Blueprint, request, jsonify
from api.models.User import User
from api.database.db import db
from flask_cors import cross_origin

api_reset = Blueprint("api_reset", __name__)

@api_reset.route('/user/password-reset', methods=['POST', 'OPTIONS'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def password_reset():
    if request.method == 'OPTIONS':
       
        return '', 204

    body = request.get_json()
    email = body.get("email")

    if not email:
        return jsonify({"message": "El email es obligatorio"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "Este email no está registrado"}), 404

    # Aquí logica del email

    return jsonify({"message": "Email encontrado. Se enviará un enlace de recuperación."}), 200
