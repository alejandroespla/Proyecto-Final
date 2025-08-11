from flask import Flask, request, jsonify, Blueprint
from api.models.Product import Product
from api.database.db import db
from api.models.User import User
from flask_cors import CORS

api_product = Blueprint('api_product', __name__)

CORS(api_product)


@api_product.route("/products", methods=["GET"])
def get_products_grouped():
    # COn el query se obitnen todos los productos
    products = Product.query.all()

    # temporal para guardar los productos por categoria
    categories_dict = {}

    for product in products:
        cat_name = product.category

        # Si la categoria no existe se crea una nueva entrada
        if cat_name not in categories_dict:
            categories_dict[cat_name] = []

        # con el append se agrega el producto a la categoria correspondiente
        categories_dict[cat_name].append({
            "id": product.id,
            "title": product.title,
            "price": product.price,
            "description": product.description,
            "subcategory": product.subcategory,
            "location": product.location,
            "username": product.user.username  # tengo que hacer una relacion con el usuario
        })

    # Darle la estructura deseada a la respuesta para manejarla en el front
    response = [
        {"category": cat, "products": products}
        for cat, products in categories_dict.items()
    ]

    return jsonify(response), 200


@api_product.route('/set-products', methods=['POST'])
def create_product():
    data = request.get_json()

    required = ["title", "description", "category",
                "subcategory", "price", "user_id"]
    if not all(k in data for k in required):
        return jsonify({"error": "Faltan campos obligatorios"}), 400


    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({"error": "El usuario no existe"}), 400

    product = Product(
        title=data['title'],
        description=data['description'],
        category=data['category'],
        subcategory=data['subcategory'],
        price=data['price'],
        location=data.get('location'),  
        user_id=data['user_id']
    )

    db.session.add(product)
    db.session.commit()

    return jsonify(product.serialize()), 201


@api_product.route("/product/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Producto no encontrado"}), 404
    return jsonify(product.serialize()), 200

@api_product.route("/product/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.get_json() or {}

    # 1) Buscar producto
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Producto no encontrado"}), 404

    # 2) Validar propietario (con lo que tienes hoy: user_id viene del front)
    # En producción, valida con usuario autenticado (sesión/JWT), no con user_id del cliente.
    user_id = data.get("user_id")
    if not user_id:
        return jsonify({"error": "Falta user_id"}), 400

    if product.user_id != user_id:
        return jsonify({"message": "forbidden"}), 403

    # 3) Actualizar solo campos permitidos (parcial o total)
    editable_fields = ("title", "description", "category", "subcategory", "price", "location")
    try:
        for field in editable_fields:
            if field in data and data[field] is not None:
                if field == "price":
                    product.price = float(data["price"])
                else:
                    setattr(product, field, data[field])
    except (TypeError, ValueError):
        return jsonify({"error": "price debe ser numérico"}), 400

    # 4) Guardar y devolver actualizado
    db.session.commit()
    return jsonify(product.serialize()), 200



