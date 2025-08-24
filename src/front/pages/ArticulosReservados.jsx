import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

export const ArticulosReservados = () => {
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("reservas")) || [];
        const currentUser = JSON.parse(localStorage.getItem("user"));

        const misReservas = data.filter(res => res.userId === currentUser?.id).map(res => ({
            ...res,
            fechaInicio: new Date(res.fechaInicio),
            fechaFin: new Date(res.fechaFin),
        }));

        setReservas(misReservas);
    }, []);

    const handleDeleteReserva = (index) => {
        const toDelete = reservas[index];

        const nuevasReservas = reservas.filter((_, i) => i !== index);
        setReservas(nuevasReservas);

        const all = JSON.parse(localStorage.getItem("reservas")) || [];
        const updated = all.filter(r =>
            !(
                r.userId === toDelete.userId &&
                r.producto?.id === toDelete.producto?.id &&
                r.fechaInicio === toDelete.fechaInicio.toISOString() &&
                r.fechaFin === toDelete.fechaFin.toISOString()
            )
        );

        localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
    };

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-end p-3">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/")}
                >
                    ✕
                </button>
            </div>
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
