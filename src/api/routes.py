"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

#from api.models import db, User
from api.database.db import db

from api.utils import generate_sitemap, APIException
from flask_cors import CORS
#from models.User import User

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200




@api.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()

    required = ["title", "description", "category", "subcategory", "price", "user_id"]
    if not all(k in data for k in required):
        return jsonify({"error": "Faltan campos obligatorios"}), 400
    
    # Verifica que el user_id exista en la tabla User
    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({"error": "El usuario no existe"}), 400

    product = Product(
        title=data['title'],
        description=data['description'],
        category=data['category'],
        subcategory=data['subcategory'],
        price=data['price'],
        location=data.get('location'),  # location puede ser opcional
        user_id=data['user_id']
    )

    db.session.add(product)
    db.session.commit()

    return jsonify(product.serialize()), 201

