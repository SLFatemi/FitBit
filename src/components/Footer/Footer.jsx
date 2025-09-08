import "./_Footer.scss";

function Footer() {
	const curYear = new Date().getFullYear();
	return (
		<div className={"container"}>
			<footer className={"section --footer"}>
				<p>© {curYear} Sina Fatemi</p>
				<p>
					Built with <span>React.js</span>
				</p>
			</footer>
		</div>
	);
}

export default Footer;
