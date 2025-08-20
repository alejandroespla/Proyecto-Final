from flask import Blueprint, request, jsonify
from models import db, Message

api_message = Blueprint("api_message", __name__)

# Crear mensaje
@api_message.route("/messages", methods=["POST"])
def create_message():
    data = request.json
    sender_id = data.get("sender_id")
    receiver_id = data.get("receiver_id")
    content = data.get("content")
    product_id = data.get("product_id")  # opcional

    if not sender_id or not receiver_id or not content:
        return jsonify({"error": "Faltan campos"}), 400

    message = Message(
        sender_id=sender_id,
        receiver_id=receiver_id,
        content=content,
        product_id=product_id
    )

    db.session.add(message)
    db.session.commit()

    return jsonify(message.serialize()), 201

# Obtener todos los mensajes de un usuario
@api_message.route("/messages/user/<int:user_id>", methods=["GET"])
def get_user_messages(user_id):
    messages = Message.query.filter(
        (Message.sender_id == user_id) | (Message.receiver_id == user_id)
    ).order_by(Message.timestamp.desc()).all()
    return jsonify([m.serialize() for m in messages]), 200

# Obtener un mensaje por ID
@api_message.route("/messages/detail/<int:message_id>", methods=["GET"])
def get_message_detail(message_id):
    message = Message.query.get(message_id)
    if not message:
        return jsonify({"error": "Mensaje no encontrado"}), 404
    return jsonify(message.serialize()), 200

# Responder mensaje
@api_message.route("/messages/reply", methods=["POST"])
def reply_message():
    data = request.json
    sender_id = data.get("sender_id")
    receiver_id = data.get("receiver_id")
    content = data.get("content")
    product_id = data.get("product_id")  # opcional

    if not sender_id or not receiver_id or not content:
        return jsonify({"error": "Faltan campos"}), 400

    reply = Message(
        sender_id=sender_id,
        receiver_id=receiver_id,
        content=content,
        product_id=product_id
    )

    db.session.add(reply)
    db.session.commit()
    return jsonify(reply.serialize()), 201
