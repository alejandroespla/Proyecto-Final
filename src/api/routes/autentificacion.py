from flask import Flask, request, jsonify, url_for, Blueprint
from api.database.db import db
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models.User import User

#  Librerias para autenticacion JWT y manejo de contraseñas
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
import bcrypt
import datetime

auth = Blueprint('auth', __name__)

# Habilitar el maldito CORS para permitir peticiones desde el frontend
CORS(auth)

# ===========================================================
# Este endpoint recibe un email y contraseña, valida el usuario
# y devuelve un token JWT + la informacion básica del usuario
# ===========================================================

#Endpoint para generar los tokens
@auth.route('/login', methods=['POST'])
def login():
    print("\n Petición de login recibida")  
    # Obtener los datos enviados por el frontend en formato JSON
    data = request.json.get("username",None) #get_json()
    print("Datos recibidos:", data)  
    email = request.json.get("email", None) #data.get('email')
    password = request.json.get("password", None) #data.get('password')

    # Por si falta email o contraseña 
    if not email or not password:
        return jsonify({"error": "Email y contraseña requeridos"}), 400

    # Se busca en la base de datos un usuario con ese email
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"error": "Contraseña incorrecta"}), 401

    # la creacion del token JWT 
    access_token = create_access_token(identity=str(user.id))

    print("✔ Login exitoso para usuario:", user.email) 
    print("Token generado:", access_token) 

    # Se devuelve el token y la informacion serializada del usuario
    response_data = {
        "token": access_token,
        "user": user.serialize()
    }
    print("Datos enviados al frontend:", response_data)  # Verifica en consola del backend
    return jsonify(response_data), 200




@auth.route('/user', methods=['GET'])
@jwt_required()  #  Para la proteccion con JWT, el token debe ser válido
def get_logged_user():
    #  Obtener el ID del usuario desde el token JWT
    
    user_id = int(get_jwt_identity())

    #  Buscar el usuario en la base de datos
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify(user.serialize()), 200
