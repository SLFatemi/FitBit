import { useState } from "react";
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

	return (
		<>
			<section className={"Hero"}>
				<div className={"background"}>
					<PixelBlast
						pixelSize={4}
						color="#B6F500"
						patternScale={3}
						patternDensity={0.8}
						pixelSizeJitter={0.2}
						enableRipples={false}
						speed={0.3}
						edgeFade={0.3}
					/>
				</div>
				<NavBar />
				<div className={"container"}>
					<div className="heading">
						<HeadingText />
						<ScrollDown />
					</div>
				</div>
			</section>
			<section className={"SearchResult"}>
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
						<Selected selected={selected} />
					</Main>
				</div>
			</section>
			<Footer />
		</>
	);
}

export default App;
