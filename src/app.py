"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from api.utils import APIException, generate_sitemap
from flask_jwt_extended import JWTManager

from flask_cors import CORS

from api.database.db import db
from api.routes.product import api_product

# Importar el blueprint del usuario
from api.routes.user import api_user

# Importar el blueprint de autenticacion
from api.routes.autentificacion import auth
from api.routes.recuperar_password import api_reset  # Importa tu blueprint de password reset
from api.admin import setup_admin
from api.commands import setup_commands

# Importar JWT para manejar autenticacion con tokens
from flask_jwt_extended import JWTManager

# ======================================================
# Inicializacion de la app Flask
# ======================================================
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.url_map.strict_slashes = False

# Clave secreta para firmar y verificar tokens JWT.
# IMPORTANTE: cambiala por una clave segura antes 
app.config["JWT_SECRET_KEY"] = "aqui_va_una_CLAVE_$Ecre@"
jwt = JWTManager(app)  # Inicializar JWT en toda la app.

# ======================================================
#  Configuracion de la base de datos
# ======================================================


db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# ======================================================
#  Inicializacion de Admin y comandos de la app
# ======================================================
setup_admin(app)
setup_commands(app)

# ======================================================
#  Registro de blueprints
# api_user → rutas de usuario
# auth → rutas de autenticacion (login, register, etc.)
# ======================================================
app.register_blueprint(api_user, url_prefix='/api/user')
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(api_product, url_prefix="/api_product")

# ======================================================
#  Manejo de errores personalizados
# ======================================================


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# ======================================================
#  Sitemap (lista de rutas) solo en desarrollo
# ======================================================


@app.route('/')
def sitemap():
    ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
    static_file_dir = os.path.join(os.path.dirname(
        os.path.realpath(__file__)), '../dist/')
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# ======================================================
#  Servir archivos estaticos (frontend) en produccion
# ======================================================


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    static_file_dir = os.path.join(os.path.dirname(
        os.path.realpath(__file__)), '../dist/')
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Evitar cache
    return response


# ======================================================
#  Ejecucion de la app
# ======================================================
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
