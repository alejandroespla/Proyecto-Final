from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Column, Integer, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
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