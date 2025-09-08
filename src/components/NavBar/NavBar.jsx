import "./_NavBar.scss";
import { Bookmark } from "lucide-react";

function NavBar() {
	return (
		<nav>
			<div className="container">
				<a href={"/#"}>FitBit</a>
				<button type={"button"} className={"btn btn-ui"}>
					<Bookmark size={24} className={"icon"} />
				</button>
			</div>
		</nav>
	);
}

export default NavBar;
