import "./_Bookmarks.scss";
import { useRef } from "react";
import { useClickOutside } from "react-haiku";
import SearchResult from "../Result/SearchResult.jsx";

function Bookmarks({ selected, setSelected, bookmarks, setIsBookmarksOpen }) {
	const ref = useRef(null);
	useClickOutside(ref, () => setIsBookmarksOpen(false));
	return (
		<div className={"bookmarks"} ref={ref}>
			<div className={"container"}>
				<ul>
					{(!bookmarks || bookmarks.length === 0) && <p>No Bookmarks</p>}
					{bookmarks?.map((bookmark) => (
						<SearchResult
							setSelected={setSelected}
							selected={selected}
							result={bookmark}
							key={bookmark.id}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Bookmarks;
