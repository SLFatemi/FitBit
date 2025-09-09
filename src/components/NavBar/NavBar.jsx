import "./_NavBar.scss";
import { Bookmark } from "lucide-react";

function NavBar({ setIsBookmarkOpen }) {
	return (
		<nav>
			<div className="container">
				<a href={"/#"}>FitBit</a>
				<div
					className={"bookmark-btn"}
					onClick={() => setIsBookmarkOpen((cur) => !cur)}
				>
					<button type={"button"} className={"btn btn-ui"}>
						<Bookmark size={24} className={"icon"} />
					</button>
					<p>Bookmarks</p>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
