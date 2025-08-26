from flask import Blueprint, request, jsonify
from flask_cors import CORS
from api.models import Chat, Message, User
from api.database.db import db


api_message = Blueprint("api_message", __name__)

# Cambia el origen a la URL exacta desde donde harás las peticiones
CORS(api_message)

@api_message.route("/open_chat", methods=["POST"])
def open_chat():
    data = request.get_json() or {}

    user_a_id = data.get("user_a_id")
    user_b_id = data.get("user_b_id")
    product_id = data.get("product_id")

    if not user_a_id or not user_b_id or not product_id:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    # Buscar chat existente (sin importar orden de user_a y user_b)
    chat = Chat.query.filter_by(user_a_id=user_a_id, user_b_id=user_b_id, product_id=product_id).first()
    if not chat:
        chat = Chat.query.filter_by(user_a_id=user_b_id, user_b_id=user_a_id, product_id=product_id).first()

    # Si no existe, crea uno nuevo
    if not chat:
        chat = Chat(user_a_id=user_a_id, user_b_id=user_b_id, product_id=product_id)
        db.session.add(chat)
        db.session.commit()

    return jsonify(chat.serialize(user_a_id)), 200


@api_message.route("/inbox/<int:user_id>", methods=["GET"])
def get_inbox(user_id):
    chats = Chat.query.filter((Chat.user_a_id == user_id) | (Chat.user_b_id == user_id)).all()
    response = [chat.serialize(user_id) for chat in chats]
    return jsonify(response), 200


@api_message.route("/chat/<int:chat_id>/messages", methods=["GET"])
def get_chat_messages(chat_id):
    chat = Chat.query.get(chat_id)
    if not chat:
        return jsonify({"error": "Chat no encontrado"}), 404
    messages = Message.query.filter_by(chat_id=chat_id).order_by(Message.timestamp.asc()).all()
    response = [msg.serialize() for msg in messages]
    return jsonify(response), 200


@api_message.route("/chat/<int:chat_id>/message", methods=["POST"])
def send_message(chat_id):
    chat = Chat.query.get(chat_id)
    if not chat:
        return jsonify({"error": "Chat no encontrado"}), 404

    data = request.get_json() or {}
    content = data.get("content")
    sender_id = data.get("sender_id")

    if not content or not sender_id:
        return jsonify({"error": "Faltan datos de mensaje"}), 400

    msg = Message(chat_id=chat_id, sender_id=sender_id, content=content)
    db.session.add(msg)
    db.session.commit()

    return jsonify(msg.serialize()), 201
