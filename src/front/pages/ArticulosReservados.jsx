import React, { useEffect, useState } from "react";

export const ArticulosReservados = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("reservas")) || [];

        // Convierte las fechas de string a Date porque como se estan guardando en el localstorage pierde el formato
        const fechaConvertida = data.map((res) => ({
            ...res,
            fechaInicio: new Date(res.fechaInicio),
            fechaFin: new Date(res.fechaFin),
        }));

        setReservas(fechaConvertida);
    }, []);

    const handleDeleteReserva = (index) => {
        const nuevasReservas = reservas.filter((_, i) => i !== index);
        setReservas(nuevasReservas);
        localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
    };

    return (
        <div className="container my-5">
            <h2>Mis artículos reservados</h2>
            {reservas.length === 0 ? (
                <p>No tienes artículos reservados</p>
            ) : (
                reservas.map((res, index) => (
                    <div key={index} className="card p-3 mb-3 position-relative">
                        <button
                            className="btn-close position-absolute top-0 end-0 m-2"
                            onClick={() => handleDeleteReserva(index)}
                        ></button>
                        <h5>{res.producto.title}</h5>
                        <p>
                            Del {res.fechaInicio.toLocaleDateString()} al{" "}
                            {res.fechaFin.toLocaleDateString()}
                        </p>
                        <p>Total: {res.total} €</p>
                        <p>Propietario: {res.dueño}</p>
                    </div>
                ))
            )}
        </div>
    );
};
