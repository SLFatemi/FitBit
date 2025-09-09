import { useEffect, useState } from "react";
import Bookmarks from "./components/Bookmarks/Bookmarks.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HeadingText from "./components/HeadingText/HeadingText.jsx";
import Main from "./components/Main/Main.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import PixelBlast from "./components/PixelBlast/PixelBlast.jsx";
import ScrollDown from "./components/ScrollDown/ScrollDown.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import Selected from "./components/Selected/Selected.jsx";
import { useFetch } from "./hooks/useFetch.jsx";

const URL_EXCERSICEDB = "https://exercisedb.p.rapidapi.com/exercises/name";

function App() {
	const [query, setQuery] = useState("");
	const [url, setUrl] = useState("");
	const [selected, setSelected] = useState(null);
	const [bookmarks, setBookmarks] = useState(() => {
		const saved = localStorage.getItem("bookmarks");
		return saved ? JSON.parse(saved) : [];
	});

	const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

	const { data, loading, error } = useFetch(url, {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": import.meta.env.VITE_API_RAPID_KEY,
			"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
		},
	});

	function handleSubmit(e) {
		e.preventDefault();
		if (!query.trim()) return;
		setUrl(
			`${URL_EXCERSICEDB}/${query.toLowerCase()}?offset=0&limit=10&sortMethod=id&sortOrder=ascending`,
		);
	}

	useEffect(() => {
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}, [bookmarks]);

	return (
		<>
			<div className="bookmarks-wrapper">
				{isBookmarksOpen && (
					<Bookmarks
						setSelected={setSelected}
						selected={selected}
						setIsBookmarksOpen={setIsBookmarksOpen}
						bookmarks={bookmarks}
					/>
				)}
			</div>
			<section className={"Hero"}>
				<div className={"background"}>
					<PixelBlast
						pixelSize={4}
						color="#B6F500"
						patternScale={3}
						patternDensity={0.4}
						pixelSizeJitter={0.2}
						enableRipples={false}
						speed={0.6}
						edgeFade={0.3}
					/>
				</div>
				<NavBar setIsBookmarkOpen={setIsBookmarksOpen} />
				<div className={"container"}>
					<div className="heading">
						<HeadingText />
						<ScrollDown />
					</div>
				</div>
			</section>
			<section className={"SearchResult"} id={"Main"}>
				<div className="container">
					<Main>
						<SearchBar
							query={query}
							setQuery={setQuery}
							handleSubmit={handleSubmit}
						/>
						<SearchResults
							query={query}
							data={data}
							loading={loading}
							error={error}
							selected={selected}
							setSelected={setSelected}
						/>
						<Selected
							setBookmarks={setBookmarks}
							bookmarks={bookmarks}
							selected={selected}
						/>
					</Main>
				</div>
			</section>
			<section className={"footer"}>
				<Footer />
			</section>
		</>
	);
}

export default App;
