import '../styles/cardProducto.css';
import { Link } from 'react-router-dom';
export const CardProducto = () => {
    return (
        <div className=' container container-xxl'>
            <article className='mt-5 d-flex flex-column'>
                <h1>Categoria de musica</h1>
                <div className='d-flex'>
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
                                        <img src="https://cdn.fanaticguitars.com/products/washburn/220002691122/washburn-c40-natural-1744099014126_1800.webp" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://cdn.fanaticguitars.com/products/washburn/220002691122/washburn-c40-natural-1744099016400_1800.webp" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://cdn.fanaticguitars.com/products/washburn/220002691122/washburn-c40-natural-1744099017736_1800.webp" class="d-block w-100" alt="..." />
                                    </div>
                                    <div className='carousel-item'>
                                        <img src="https://cdn.fanaticguitars.com/products/washburn/220002691122/washburn-c40-natural-1744099019736_1800.webp" class="d-block w-100" alt="" />
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
                                <h5 class="card-title  ">Guitarra  Washburn <span>25€/Dia</span> </h5>
                                <p class="card-text">Disfruta con esta guitarra Washburn de la conexión con la música. Está diseñada para aficionados y profesionales. Con este instrumento descubrirás nuevos acordes, entonarás tus canciones y disfrutarás de la vida musical</p>
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
                                        <img src="https://r2.gear4music.com/media/52/526138/1200/preview_1.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://r2.gear4music.com/media/71/710901/1200/preview.jpg" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://r2.gear4music.com/media/52/526140/1200/preview_1.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div className='carousel-item'>
                                        <img src="https://r2.gear4music.com/media/52/526141/1200/preview_1.jpg" class="d-block w-100" alt="" />
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
                                <h5 class="card-title ">Amplificador <span>20€/Dia</span> </h5>
                                <p class="card-text">El Amplificador de Guitarra Eléctrica de 15 W de Gear4music es un amplificador de práctica compacto y potente con funciones intuitivas. Su diseño increíblemente sencillo permite definir el sonido de forma instintiva y directa. De este modo, podrá conseguir un sonido excelente con total facilidad.</p>
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
                                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://auvisa.com/cdn/shop/files/67628.jpg?v=1719509386" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://auvisa.com/cdn/shop/files/67628_hash_escaped_04.jpg?v=1719509388" class="d-block w-100 " alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://auvisa.com/cdn/shop/files/67628_hash_escaped_05.jpg?v=1719509389" class="d-block w-100" alt="..." />
                                    </div>
                                    <div className='carousel-item'>
                                        <img src="https://auvisa.com/cdn/shop/files/67628_hash_escaped_09.jpg?v=1719509391" class="d-block w-100" alt="" />
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
                                <h5 class="card-title  ">BATERIA ACUSTICA<span>15€/Dia</span> </h5>
                                <p class="card-text">Ideal para disfrutar una noche de banda musical, con tu grupo y arrasar en el escenario </p>
                                <p>Disponible</p>
                            </div>
                        </div>
                    </a>
                </div>
            </article>
            <article className='mt-5 d-flex flex-column'>
                <h1>Categoria de Deporte </h1>
                <div className='d-flex'>
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
                <div className='d-flex'>
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
        </div>
    )
}