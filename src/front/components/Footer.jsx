export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="d-flex justify-content-center containerFooter">
			<div className="sections d-flex flex-column flex-md-row justify-content-center  ">
				<section className="sectionLogo col-2 ">
					<img className="imgFooter" src="src/front/assets/img/logo.png" alt="" />
					<p>© 2013-2025 Sportsy. Todos los derechos reservados</p>
				</section>
				<section className="col-6 col-md-2 p-0 px-md-3">
					<p><strong>Sportsy</strong></p>
					<ul className="p-0 list-unstyled">
						<li>Quiénes somos</li>
						<li>Cómo Funciona</li>
						<li>Brand Book</li>
						<li>Prensa</li>
						<li>Empleo</li>
						<li>Sostenibilidad</li>
					</ul>
				</section>
				<section className="col-6 col-md-2 p-0 px-md-3" >
					<p><strong>Soporte</strong></p>
					<ul className="p-0 list-unstyled">
						<li>Centro de ayuda</li>
						<li>Normas de la comunidad</li>
						<li>Consejos de seguridad</li>
					</ul>
				</section>
				
				<section className="col-6 col-md-2 p-0 px-md-3">
					<p><strong>Legal</strong></p>
					<ul className="p-0 list-unstyled">
						<li>Aviso Legal</li>
						<li>Condiciones de uso</li>
						<li>Politica de privacidad</li>
						<li>Politica de Cookies</li>
					</ul>
				</section>
				
				<section className="col-6 col-md-2 p-0 px-md-3">
					<p><strong>Sportsy Pro</strong></p>
					<ul className="p-0 list-unstyled">
						<li>Multicategoria</li>
						<li>Desportes</li>
					</ul>
				</section>
			</div>
		</div>
	</footer>
);
