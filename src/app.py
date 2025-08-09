"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from api.utils import APIException, generate_sitemap
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail  

from api.database.db import db
from api.routes.product import api_product
from api.routes.user import api_user  # Blueprint de usuario
from api.routes.autentificacion import auth  # Blueprint de autenticación
from api.routes.recuperar_password import api_reset  # Blueprint de password reset
from api.admin import setup_admin
from api.commands import setup_commands

# ======================================================
# Inicialización de la app Flask
# ======================================================
app = Flask(__name__)
# Habilitar CORS para todo y todos los orígenes (en producción restringir)

frontend_url = os.getenv("FRONTEND_URL")
CORS(app, resources={r"/*": {"origins": frontend_url}}, supports_credentials=True)


# Clave secreta para JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "clave_secreta_por_defecto")
jwt = JWTManager(app)

# ======================================================
# Configuración de Flask-Mail
# ======================================================
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Servidor SMTP
app.config['MAIL_PORT'] = 587                 # Puerto TLS
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

mail = Mail(app)  # Aquí creas el objeto Mail
app.mail = mail   # Guardamos mail para poder usarlo desde otros módulos

# ======================================================
# Configuración de la base de datos
# ======================================================
db_url = os.getenv("DATABASE_URL")
if db_url:
    # Adaptar URL para SQLAlchemy si usas PostgreSQL
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://", 1)
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# ======================================================
# Inicialización de Admin y comandos personalizados
# ======================================================
setup_admin(app)
setup_commands(app)

# ======================================================
# Registro de blueprints
# ======================================================
app.register_blueprint(api_user, url_prefix='/api/user')
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(api_product, url_prefix="/api")
app.register_blueprint(api_reset, url_prefix="/api")  # Rutas: /api/password-reset y /api/reset-password

# ======================================================
# Manejo de errores personalizados
# ======================================================
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# ======================================================
# Sitemap y servir frontend estático
# ======================================================
@app.route('/')
def sitemap():
    ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
    static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# ======================================================
# Ejecutar la app
# ======================================================
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
