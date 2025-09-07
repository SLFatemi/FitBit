import "./_NavBar.scss";
import { Bookmark } from "lucide-react";

function NavBar() {
	return (
		<nav>
			<div className="container">
				<h3>FitBit</h3>
				<button type={"button"} className={"btn btn-ui"}>
					<Bookmark size={24} className={"icon"} />
				</button>
			</div>
		</nav>
	);
}

export default NavBar;
