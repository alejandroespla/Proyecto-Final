import { Link } from "react-router-dom";
import { Container, Button, Carousel } from "react-bootstrap";
import banner from "../assets/img/banner.png";
import banner2 from "../assets/img/banner2.jpeg";
import banner3 from "../assets/img/banner3.jpg";
import banner4 from "../assets/img/banner4.png";

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
          <Carousel.Caption className="caption-style text-start text-dark ">
            <p className="bigFont fw-medium ">¿Solo lo necesitas un día?</p>
            <p className="text-banner fw-light">
              
              ¡Alquílalo fácil y ahorra! <br />
              Y si tienes material, gana dinero prestándolo.
            </p>
            <Link to={"/add-product"}>
              <Button variant="btn btn-outline-success" size="lg">
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
          <Carousel.Caption className="caption-style text-start text-dark d-flex flex-column justify-content-around">
            <h1 className="fw-bold">No compres lo que puedes alquilar.</h1>
            <p className="lead">
              
              Usa el material solo cuando lo necesites,
              y saca beneficio del que ya tienes.
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
          <Carousel.Caption className="caption-style text-start text-dark d-flex flex-column justify-content-around">
            <h1 className="fw-bold">¿Vas a usarlo una vez?</h1>
            <p className="lead">
              
              ¡No lo compres, alquílalo aquí!
              Y si lo tienes tirado en casa… ¡ponlo a generar dinero!
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
            src={banner4}
            alt="Slide 4"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption className="caption-style text-start text-dark d-flex flex-column justify-content-around">
            <h1 className="fw-bold">Gana prestando.</h1>
            <p className="lead">
              Ahorra alquilando. 
              Todo el material deportivo que necesitas, en una sola app.
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