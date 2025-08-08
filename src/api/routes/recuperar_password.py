from flask import Blueprint, request, jsonify, current_app as app
from api.database.db import db
from api.models.User import User
from flask_mail import Message
from flask_jwt_extended import create_access_token, decode_token
from datetime import timedelta
from werkzeug.security import generate_password_hash
import os

api_reset = Blueprint('api_reset', __name__)

# Usar variable de entorno para la URL del frontend
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://probable-waffle-64p76qv66pcr7v7-3000.app.github.dev")


@api_reset.route('/password-reset', methods=['POST'])
def send_password_reset():
    data = request.get_json(silent=True)
    if not data or 'email' not in data:
        return jsonify({"message": "Email requerido en formato JSON"}), 400

    email = data['email']

    # Verifica que el usuario exista
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Email no registrado"}), 404

    # Crea un token que expira en 1 hora
    expires = timedelta(hours=1)
    reset_token = create_access_token(identity=user.id, expires_delta=expires)

    # 🔹 Enlace al frontend con el token como query
    reset_url = f"{FRONTEND_URL}/reset-password?token={reset_token}"

    # Prepara el correo
    msg = Message(
        "Recupera tu contraseña",
        sender=app.config['MAIL_USERNAME'],
        recipients=[email]
    )
    msg.body = (
        f"Para recuperar tu contraseña, haz clic en el siguiente enlace:\n"
        f"{reset_url}\n\n"
        "Este enlace expirará en 1 hora."
    )

    try:
        app.mail.send(msg)
        return jsonify({"message": "Correo de recuperación enviado"}), 200
    except Exception as e:
        return jsonify({"message": "Error enviando el correo", "error": str(e)}), 500


# RESTABLECER CONTRASEÑA USANDO TOKEN
@api_reset.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json(silent=True)
    if not data or 'token' not in data or 'password' not in data:
        return jsonify({"message": "Faltan datos: token y password son requeridos"}), 400

    token = data['token']
    new_password = data['password']

    try:
        identity = decode_token(token)['sub']  # Obtiene el user.id del token
    except Exception:
        return jsonify({"message": "Token inválido o expirado"}), 400

    user = User.query.get(identity)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    # Cambia la contraseña
    user.password = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Contraseña actualizada correctamente"}), 200
