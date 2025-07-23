import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import banner from "../assets/img/banner.jpg";

export const Banner = () => {
  return (
    <Container
      fluid
      className=""
      style={{ maxHeight: "500px", overflow: "hidden", backgroundColor: "#CE8C1A"}}
    >
      <Row className="align-items-center flex-column flex-md-row text-center text-md-start" style={{ height: "100%" }}>
        <Col className="d-flex justify-content-end" md={5} style={{ maxHeight: "500px" }}>
          <img 
            src={banner}
            alt="Material Deportivo"
            style={{
              height: "450px",           
            }}
          />
        </Col>
        <Col md={5} className="ms-5 mt-4 mt-md-0.">
          <h2 className="fw-bold">¿Necesitas material deportivo?</h2>
          <p className="lead">
            No te gastes un pastón para usarlo solo un día,
            <strong> ¡alquílalo aquí!</strong> Y además, saca un extra
            <strong> prestando el tuyo.</strong>
          </p>
          <Button variant="success" size="lg">
            Empieza ahora
          </Button>
        </Col>
      </Row>
    </Container>
  );
};