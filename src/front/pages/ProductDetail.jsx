import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";

const ProductDetail = ({ product }) => {
  if (!product) return <div className="text-center py-5">Cargando producto...</div>;

  return (
    <Container className="my-5">
      <Row>
        {/* Imagen del producto */}
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={product.image || "/placeholder.jpg"}
              alt={product.title}
              style={{ height: "500px", objectFit: "cover" }}
            />
          </Card>
        </Col>

        {/* Información del producto */}
        <Col md={5}>
          <div className="d-flex flex-column justify-content-between h-100 mt-4 mt-md-0">
            <div>
              <h2 className="fw-bold">{product.price} €</h2>
              <h4 className="mt-2">{product.title}</h4>
              <p className="text-muted mt-3">{product.description}</p>

              <div className="d-flex align-items-center text-muted mb-3">
                <FaMapMarkerAlt className="me-2" />
                <span>{product.location || "Ubicación no disponible"}</span>
              </div>

              <hr />

              <div className="d-flex align-items-center">
                <FaUserCircle size={40} className="me-3 text-secondary" />
                <div>
                  <h6 className="mb-0">{product.owner || "Usuario anónimo"}</h6>
                  <small className="text-muted">Vendedor en Sportsy</small>
                </div>
              </div>
            </div>

            <Button variant="success" className="mt-4 py-3 fw-bold">
              Contactar con el vendedor
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;