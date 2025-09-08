import "./_SearchBar.scss";
import { Search } from "lucide-react";

function SearchBar({ query, setQuery, handleSubmit }) {
	return (
		<form className={"wrapper"} onSubmit={handleSubmit}>
			<input
				type={"text"}
				placeholder={"Overhead Squats"}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			></input>
			<button className={"btn btn-ui"} type={"submit"}>
				<Search className={"icon"} />
			</button>
		</form>
	);
}

export default SearchBar;
