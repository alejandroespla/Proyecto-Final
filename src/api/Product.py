from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from api.models import db


class Product(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(String(120), nullable=False)
    description = Column(String(500), nullable=False)
    category = Column(String(120), nullable=False)
    subcategory = Column(String(120), nullable=False)
    price = Column(Float, nullable=False)
    location = Column(String(120))
    # user_id = Column(Integer, ForeignKey('user.id'), nullable=False) ----> AGREGAR CUANDO ESTE CREADO EL USUARIO

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
            # "user_id": self.user_id, ----> AGREGAR CUANDO ESTE CREADO EL USUARIO
            "username": self.user.username
        }
