import '../styles/cardProducto.css';
import { Link } from 'react-router-dom';
export const CardProducto = () =>{
    return (
        <div>
            <div className="card " >
                <img src="" className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">Nombre producto</h5>
                    <h6 className="card-subtitle mb2 text-body-secondary">Precio del producto</h6>
                    <p className="card-text">Esto es la descripcion del producto,añadir mas texto para completar y asegurar que se vaya hacia abajo </p>
                </div>
            </div>
        </div>
    )
}