from sqlalchemy import String, Boolean, Integer, Float, Column, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from api.database.db import db
from api.models.User import User


class Product(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(String(120), nullable=False)
    description = Column(String(500), nullable=False)
    category = Column(String(120), nullable=False)
    subcategory = Column(String(120), nullable=False)
    price = Column(Float, nullable=False)
    location = Column(String(120))
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)

    user = relationship("User", backref="products")

    def serialize(self):
            return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "subcategory": self.subcategory,
            "price": self.price,
            "location": self.location,
            "user_id": self.user_id,
            "username": self.user.username
        }