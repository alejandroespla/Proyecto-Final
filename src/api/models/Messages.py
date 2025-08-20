from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from models import db

class Message(db.Model):
    __tablename__ = "message"
    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, nullable=False)
    receiver_id = Column(Integer, nullable=False)
    content = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    product_id = Column(Integer, ForeignKey("product.id"), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "content": self.content,
            "timestamp": self.timestamp.isoformat(),
            "product_id": self.product_id,
        }
