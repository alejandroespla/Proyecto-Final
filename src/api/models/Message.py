from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from api.database.db import db

class Chat(db.Model):
    __tablename__ = "chat"
    id = Column(Integer, primary_key=True)
    user_a_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    user_b_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('product.id'), nullable=True)

    user_a = relationship("User", foreign_keys=[user_a_id])
    user_b = relationship("User", foreign_keys=[user_b_id])
    product = relationship("Product", foreign_keys=[product_id])

    def serialize(self, current_user_id):
        other_user = self.user_a if self.user_b_id == current_user_id else self.user_b
        return {
            "id": self.id,
            "product_id": self.product_id,
            "other_user_id": other_user.id,
            "other_user_name": other_user.username,
        }

class Message(db.Model):
    __tablename__ = "message"
    id = Column(Integer, primary_key=True)
    chat_id = Column(Integer, ForeignKey('chat.id'), nullable=False)
    sender_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    chat = relationship("Chat", backref="messages")
    sender = relationship("User")

    def serialize(self):
        return {
            "id": self.id,
            "chat_id": self.chat_id,
            "sender_id": self.sender_id,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
        }
