import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";

export const CardProducto = () => {
    const { id } = useParams();
    const [prod, setProd] = useState(null);
    const [loading, setLoading] = useState(true);
    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api_product/product/${id}`);
                const data = await res.json();
                setProd(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) return <div className="container my-5">Cargando producto…</div>;
    if (!prod) return <div className="container my-5">Producto no encontrado</div>;
    return (
        <div className=' container container-xxxl'>
            <article className='mt-5 d-flex flex-column '>
                <h1>Categoria de montaña:</h1>
                <h4>Descubres lugares nuevos </h4>
                <div className='d-flex item-card'>
                    <a className='select-card text-dark link-underline link-underline-opacity-0'>
                        <div className='product-card '>
                            <div id="carouselExampleIndicators" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://assets.thenorthface.eu/images/t_img/f_auto,h_462,w_462,e_sharpen:60/dpr_2.0/v1753206954/NF0A87BZ4GZ-HERO/Terra-55Litre-Hiking-Backpack.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://assets.thenorthface.eu/images/t_img/f_auto,h_462,w_462,e_sharpen:60/dpr_2.0/v1753206953/NF0A87BZ4GZ-ALT2/Terra-55Litre-Hiking-Backpack.jpg" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://assets.thenorthface.eu/images/t_img/f_auto,h_462,w_462,e_sharpen:60/dpr_2.0/v1753206954/NF0A87BZ4GZ-ALT4/Terra-55Litre-Hiking-Backpack.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div className='carousel-item'>
                                        <img src="https://assets.thenorthface.eu/images/t_img/f_auto,h_462,w_462,e_sharpen:60/dpr_2.0/v1753206954/NF0A87BZ4GZ-ALT5/Terra-55Litre-Hiking-Backpack.jpg" class="d-block w-100" alt="" />
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="card-body overflow-y-hidden ">
                                <h5 class="card-title  ">Macuto de senderismo <span>50€/Dia</span> </h5>
                                <p class="card-text"> Este clásico macuto de senderismo está diseñado para varios días de ruta. Cuenta con un panel trasero con un patrón distribuido de manera estratégica, correas para los hombros y cinturón lumbar, todo con un acabado cómodo y transpirable.</p>
                                <p>Disponible</p>
                            </div>
                        </div>
                    </a>
                    <a className='select-card text-dark link-underline link-underline-opacity-0'>
                        <div className='product-card '>
                            <div id="carouselExampleIndicators1" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://cdn.deporvillage.com/cdn-cgi/image/h=2250,w=1800,dpr=1,f=auto,q=75,fit=contain,background=white/product-vertical/grn-330024_001.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://cdn.deporvillage.com/cdn-cgi/image/h=2250,w=1800,dpr=1,f=auto,q=75,fit=contain,background=white/product-vertical/grn-330024_003.jpg" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://cdn.deporvillage.com/cdn-cgi/image/h=2250,w=1800,dpr=1,f=auto,q=75,fit=contain,background=white/product-vertical/grn-330024_007.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div className='carousel-item'>
                                        <img src="https://cdn.deporvillage.com/cdn-cgi/image/h=2250,w=1800,dpr=1,f=auto,q=75,fit=contain,background=white/product-vertical/grn-330024_010.jpg" class="d-block w-100" alt="" />
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="card-body overflow-y-hidden">
                                <h5 class="card-title ">Tienda de campaña <span>39€/Dia</span> </h5>
                                <p class="card-text">Grand Canyon son las compañeras perfectas para hacer senderismo, ciclismo, kayak, escapadas de fin de semana, ir de vacaciones, a festivales o acampar con tus hijos en el jardín.</p>
                                <p>Disponible</p>
                            </div>
                        </div>
                    </a>
                    <a className='select-card text-dark link-underline link-underline-opacity-0'>
                        <div className='product-card '>
                            <div id="carouselExampleIndicators2" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="2" aria-label="Slide 3"></button>

                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://contents.mediadecathlon.com/m12360339/k$74bb17ff5a920be882789d1e55847185/picture.jpg?format=auto&f=640x0" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://contents.mediadecathlon.com/m12360317/k$2365132bbf07ee0bf0bf57af81615948/picture.jpg?format=auto&f=969x0" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://contents.mediadecathlon.com/m12360781/k$7c15a617110972bcbeef6cb3fb1846a7/picture.jpg?format=auto&f=320x0" class="d-block w-100" alt="..." />
                                    </div>

                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="card-body overflow-y-hidden">
                                <h5 class="card-title  ">Zapatos de senderismo<span>45€/Dia</span> </h5>
                                <p class="card-text">Bota de trekking y excursionismo con look y tecnología derivados de la familia Trango. Está diseñada para rutas por caminos de tierra, paseos por el bosque y excursiones con la mochila completamente </p>
                                <p>Disponible</p>
                            </div>
                        </div>
                    </a>
                </div>
            </article>
            <article className='mt-5 d-flex flex-column'>
                <h1>Categoria de Deporte: </h1> <h4>No olvides de moverte</h4>
                <div className='d-flex item-card'>
                    <a className='select-card text-dark link-underline link-underline-opacity-0'>
                        <div className='product-card '>
                            <div id="carouselExampleIndicators3" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/ad2f0f4e4c794309b8ac628a3acd2e7e_9366/Bota_de_futbol_Predator_League_Fold-Over_Tongue_cesped_natural_seco-multisuperficie_Blanco_JI1114_22_model.jpg" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/9cf83fcbf4624f978d614a5373b1301b_9366/Bota_de_futbol_Predator_League_Fold-Over_Tongue_cesped_natural_seco-multisuperficie_Blanco_JI1114_41_detail.jpg" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/a059e1a78de849a1952e392fc4a4eca2_9366/Bota_de_futbol_Predator_League_Fold-Over_Tongue_cesped_natural_seco-multisuperficie_Blanco_JI1114_05_standard.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div className='carousel-item'>
                                        <img src="https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/a22158afb3f94eff81c95041c6e6efe5_9366/Bota_de_futbol_Predator_League_Fold-Over_Tongue_cesped_natural_seco-multisuperficie_Blanco_JI1114_42_detail.jpg" class="d-block w-100" alt="" />
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="card-body overflow-y-hidden">
                                <h5 class="card-title  ">Botas de Futbol predator  <span>25€/Dia</span> </h5>
                                <p class="card-text">Descubre la diferencia entre pensar que marcarás y saber que lo harás con adidas Predator. Esta bota League presenta un empeine Hybridfeel con textura en relieve e inserciones Strikescale y una lengüeta plegable que te proporcionan un control excepcional del balón en cada disparo. </p>
                                <p>Disponible</p>
                            </div>
                        </div>
                    </a>
                    <a className='select-card text-dark link-underline link-underline-opacity-0'>
                        <div className='product-card '>
                            <div id="carouselExampleIndicators4" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators4" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators4" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators4" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators4" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw98b4031f/images/full/2026_FULL_/2026/2026_FULL_grizl_cf-7_4167_R126_P01.jpg?sw=1300&sfrm=png&q=90&bgcolor=F2F2F2" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dwcde1c14a/images/detail/2026_FULL_/2026/2026_FULL_grizl_cf-7_4167_R126_P01.jpg?sw=1300&sh=1300&sm=cut&sfrm=png&q=90&bgcolor=F2F2F2" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dwd726f873/images/top/2026_TOP-2/2026/2026_TOP-2_grizl_cf-7_4167_R126_P01_storage.jpg?sw=1300&sh=1300&sm=cut&sfrm=jpg&q=80" class="d-block w-100" alt="..." />
                                    </div>
                                    <div className='carousel-item'>
                                        <img src="https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dwa6856f7e/images/top/2026_TOP-4/2026/2026_TOP-4_grizl_cf-7_4167_R126_P01_racks.jpg?sw=1300&sh=1300&sm=cut&sfrm=jpg&q=80" class="d-block w-100" alt="" />
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators4" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators4" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="card-body overflow-y-hidden">
                                <h5 class="card-title ">Bicicleta Grzl CF7 <span>20€/Dia</span> </h5>
                                <p class="card-text">La Grizl OG está diseñada para disfrutar al máximo de tus salidas favoritas por la montaña. Acompaña a GRL PCK en un paseo para explorar los Alpes y descubrir los lugares más atractivos lejos de la ruta.</p>
                                <p>Disponible</p>
                            </div>
                        </div>
                    </a>
                    <a className='select-card text-dark link-underline link-underline-opacity-0'>
                        <div className='product-card '>
                            <div id="carouselExampleIndicators5" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators5" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators5" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators5" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators5" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://www.inercia.com/media/catalog/product/cache/0cabcc20fb3c3e84a02b25c1f91879cb/r/o/rollerblade_lightning_w_white-aqua_1.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://www.inercia.com/media/catalog/product/cache/0cabcc20fb3c3e84a02b25c1f91879cb/r/o/rollerblade_lightning_w_white-aqua_3.jpg" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://www.inercia.com/media/catalog/product/cache/0cabcc20fb3c3e84a02b25c1f91879cb/r/o/rollerblade_lightning_w_white-aqua_5.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div className='carousel-item'>
                                        <img src="https://www.inercia.com/media/catalog/product/cache/0cabcc20fb3c3e84a02b25c1f91879cb/r/o/rollerblade_lightning_w_white-aqua_6.jpg" class="d-block w-100" alt="" />
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators5" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators5" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="card-body overflow-y-hidden">
                                <h5 class="card-title ">Patines Rollerblade Lightning <span>15€/Dia</span> </h5>
                                <p class="card-text">El Lightning es un patín cómodo y versátil, perfecto para la ciudad, el parque o el disfrute recreativo.Adecuado para patinadores urbanos, de fitness, de desplazamiento y recreativos que buscan versatilidad y mejoras en ajuste y rendimiento.</p>
                                <p>Disponible</p>
                            </div>
                        </div>
                    </a>
                </div>
            </article>
            <article className='d-flex flex-column'>
                <h1>Categoria de Agua:</h1><h4>Sumergete en la aventura de agua</h4>
                <div className='d-flex item-card'>
                    <a className='select-card text-dark link-underline link-underline-opacity-0'>
                        <div className='product-card '>
                            <div id="carouselExampleIndicators6" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators6" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators6" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://cdn.deporvillage.com/cdn-cgi/image/h=785,w=628,dpr=1,f=auto,q=75,fit=contain,background=white/product-vertical/z3-ws21magi116_001.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://cdn.deporvillage.com/cdn-cgi/image/h=785,w=628,dpr=1,f=auto,q=75,fit=contain,background=white/product-vertical/z3-ws21magi116_002.jpg" class="d-block w-100 " alt="..." />
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators6" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators6" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="card-body overflow-y-hidden">
                                <h5 class="card-title  ">Traje de neopreno <span>25€/Dia</span> </h5>
                                <p class="card-text">Disfruta de un momento divertido con tus amigos de manera profesional. Hecha con materiales de alta calidad con la densidad justa para un rendimiento óptimo a un precio muy competitivo</p>
                                <p>Disponible</p>
                            </div>
                        </div>
                    </a>
                    <a className='select-card text-dark link-underline link-underline-opacity-0'>
                        <div className='product-card '>
                            <div id="carouselExampleIndicators7" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators7" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators7" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators7" data-bs-slide-to="2" aria-label="Slide 3"></button>

                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://contents.mediadecathlon.com/p2637123/k$c375c4483682da4e8bbd309dda22e10a/picture.jpg?format=auto&f=3000x0" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://contents.mediadecathlon.com/p2637121/k$9a2882873bd4050ad8d3edc253752fc2/picture.jpg?format=auto&f=320x0" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://contents.mediadecathlon.com/p2919871/k$af68fbffad741a23f0e2ebfc510a6adf/picture.jpg?format=auto&f=3000x0" class="d-block w-100" alt="..." />
                                    </div>

                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators7" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators7" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="card-body overflow-y-hidden">
                                <h5 class="card-title ">Pelota de Playa <span>20€/Dia</span> </h5>
                                <p class="card-text">balón flexible y agradable podrás aprender los primeros gestos del vóley playa, mientras te diviertes.</p>
                                <p>Disponible</p>
                            </div>
                        </div>
                    </a>
                    <a className='select-card text-dark link-underline link-underline-opacity-0'>
                        <div className='product-card '>
                            <div id="carouselExampleIndicators8" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators8" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators8" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators8" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators8" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://contents.mediadecathlon.com/p2793405/k$514577c49d0e14c099554a5ddb563753/picture.jpg?format=auto&f=969x0" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://contents.mediadecathlon.com/p2793408/k$78a5a7c48ac7ad837c230335e15d3734/picture.jpg?format=auto&f=969x0" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://contents.mediadecathlon.com/p2793402/k$fa1d46df9e8aa023a0a3ad598620fc61/picture.jpg?format=auto&f=640x0" class="d-block w-100" alt="..." />
                                    </div>
                                    <div className='carousel-item'>
                                        <img src="https://contents.mediadecathlon.com/p2793407/k$ba28bdabd0befeb919a17b9631ef3dcf/picture.jpg?format=auto&f=3000x0" class="d-block w-100" alt="" />
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators8" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators8" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div class="card-body overflow-y-hidden">
                                <h5 class="card-title  ">tabla Surf Fish  <span>15€/Dia</span> </h5>
                                <p class="card-text">Disfruta con esta guitarra Washburn de la conexión con la música. Está diseñada para aficionados y profesionales. Con este instrumento descubrirás nuevos acordes, entonarás tus canciones y disfrutarás de la vida musical</p>
                                <p>Disponible</p>
                            </div>
                        </div>
                    </a>
                </div>
            </article>
            <div>
                <Navbar />
                <div className="container my-5">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <img
                                src={prod.image || "https://via.placeholder.com/800x600"}
                                alt={prod.title}
                                className="img-fluid rounded shadow-sm"
                            />
                        </div>
                        <div className="col-md-6">
                            <h2 className="mb-2">{prod.title}</h2>
                            <p className="text-muted">{prod.category} / {prod.subcategory}</p>
                            <h3 className="text-danger mb-3">{prod.price} €/día</h3>

                            <p className="mb-4">{prod.description}</p>

                            <div className="d-flex flex-column gap-1 mb-4">
                                <span><strong>Ubicación:</strong> {prod.location || "—"}</span>
                                <span><strong>Publicado por:</strong> {prod.username}</span>
                            </div>

                            <div className="d-flex gap-2">
                                <button className="btn btn-primary">Reservar</button>
                                <button className="btn btn-outline-secondary">Contactar</button>
                                {/* Botón de prueba "Editar" */}
                                {/* Si quieres mostrarlo siempre para probar, deja solo el Link. 
                  Si quieres mostrarlo solo al dueño, envuelve con la condición: */}
                                {currentUser?.id === prod.user_id && (
                                    <Link to={`/products/${id}/edit`} className="btn btn-warning">
                                        Editar
                                    </Link>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
};