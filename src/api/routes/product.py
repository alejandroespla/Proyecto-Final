from flask import jsonify, Blueprint
from api.models.Product import Product
from api.database.db import db

api = Blueprint('api', __name__)

@api.route("/products", methods=["GET"])
def get_products_grouped():
    # COn el query se obitnen todos los productos
    products = Product.query.all()

    # temporal para guardar los productos por categoría
    categories_dict = {}

    for product in products:
        cat_name = product.category

        # Si la categoría no existe se crea una nueva entrada
        if cat_name not in categories_dict:
            categories_dict[cat_name] = []

        # con el append se agrega el producto a la categoría correspondiente
        categories_dict[cat_name].append({
            "id": product.id,
            "title": product.title,
            "price": product.price,
            "description": product.description,
            "subcategory": product.subcategory,
            "location": product.location,
            "username": product.user.username  # tengo que hacer una relación con el usuario
        })

    # Darle la estructura deseada a la respuesta para manejarla en el front
    response = [
        {"category": cat, "products": products}
        for cat, products in categories_dict.items()
    ]

    return jsonify(response), 200
