export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="d-flex justify-content-center container">
			<div className="sections d-flex flex-column flex-md-row justify-content-center  ">
				<section className="sectionLogo col-6 col-md-2 p-0 px-md-3 ">
					<img className="imgLogo" src="public/Logo.png" alt="" />
					<p>© 2013-2025 Sportsy. Todos los derechos reservados</p>
				</section>
				<section className="col-6 col-md-2 p-0 px-md-3" >
					<p><strong>Soporte</strong></p>
					<ul>
						<li>Centro de ayuda</li>
						<li>Normas de la comunidad</li>
						<li>Consejos de seguridad</li>
					</ul>
				</section>
				
				<section className="col-6 col-md-2 p-0 px-md-3">
					<p><strong>Legal</strong></p>
					<ul>
						<li>Aviso Legal</li>
						<li>Condiciones de uso</li>
						<li>Politica de privacidad</li>
						<li>Politica de Cookies</li>
					</ul>
				</section>
			</div>
		</div>
	</footer>
);
