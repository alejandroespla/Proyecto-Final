from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)

    products = db.relationship('Product', back_populates='user', cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    category = db.Column(db.String(120), nullable=False)
    subcategory = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(120))

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='products')

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
            "username": self.user.username if self.user else None
        }