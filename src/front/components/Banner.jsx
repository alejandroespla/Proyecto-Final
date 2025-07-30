import { Link } from "react-router-dom";
import { Container, Button, Carousel } from "react-bootstrap";
import banner from "../assets/img/banner.png";
import banner2 from "../assets/img/banner2.jpeg";
import banner3 from "../assets/img/banner3.jpg";
// import slide4 from "../assets/img/slide4.jpg";

export const Banner = () => {
  return (
    <Container fluid className="p-0">
      <Carousel fade>
        {/* SLIDE 1 */}
        <Carousel.Item>
          <img
            className="d-flex align-items-start w-100"
            src={banner2}
            alt="Material Deportivo"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption className="caption-style text-start text-light">
            <h2 className="fw-bold">¿Necesitas material deportivo?</h2>
            <p className="lead">
              No te gastes un pastón para usarlo solo un día,
              <strong> ¡alquílalo aquí!</strong> Y además, saca un extra
              <strong> prestando el tuyo.</strong>
            </p>
            <Link to={"/add-product"}>
              <Button variant="success" size="lg">
                Empieza ahora
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>

        {/* SLIDE 2 */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner}
            alt="Slide 2"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption className="caption-style text-start text-light">
            <h2 className="fw-bold">¿Necesitas material deportivo?</h2>
            <p className="lead">
              No te gastes un pastón para usarlo solo un día,
              <strong> ¡alquílalo aquí!</strong> Y además, saca un extra
              <strong> prestando el tuyo.</strong>
            </p>
            <Link to={"/add-product"}>
              <Button variant="success" size="lg">
                Empieza ahora
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>

        {/* SLIDE 3 */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner3}
            alt="Slide 3"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption className="caption-style text-start text-light">
            <h2 className="fw-bold">¿Necesitas material deportivo?</h2>
            <p className="lead">
              No te gastes un pastón para usarlo solo un día,
              <strong> ¡alquílalo aquí!</strong> Y además, saca un extra
              <strong> prestando el tuyo.</strong>
            </p>
            <Link to={"/add-product"}>
              <Button variant="success" size="lg">
                Empieza ahora
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>

        {/* SLIDE 4 */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner}
            alt="Slide 4"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption className="caption-style text-start text-light">
            <h2 className="fw-bold">¿Necesitas material deportivo?</h2>
            <p className="lead">
              No te gastes un pastón para usarlo solo un día,
              <strong> ¡alquílalo aquí!</strong> Y además, saca un extra
              <strong> prestando el tuyo.</strong>
            </p>
            <Link to={"/add-product"}>
              <Button variant="success" size="lg">
                Empieza ahora
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};