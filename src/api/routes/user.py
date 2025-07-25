from flask import Flask, request, jsonify, Blueprint
from database.db import db
from models.User import User

api = Blueprint("api/user", __name__)

