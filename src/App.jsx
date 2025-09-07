import { useState } from "react";
import HeadingText from "./components/HeadingText/HeadingText.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import PixelBlast from "./components/PixelBlast/PixelBlast.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import { useFetch } from "./hooks/useFetch.jsx";

const URL_EXCERSICEDB = "https://exercisedb.p.rapidapi.com/exercises/name";
// const URL_API_NINJA = "https://api.api-ninjas.com/v1/exercises?muscle";

function App() {
	const [query, setQuery] = useState("");
	const [url, setUrl] = useState("");

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
		<section className={"Hero"}>
			<div
				className={"background"}
				style={{ width: "100%", height: "100dvh", position: "relative" }}
			>
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
					<SearchBar
						handleSubmit={handleSubmit}
						query={query}
						setQuery={setQuery}
					/>
				</div>
			</div>
		</section>
	);
}

export default App;
