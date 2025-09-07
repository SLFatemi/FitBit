import "./_SearchBar.scss";
import { Search } from "lucide-react";

function SearchBar({ query, setQuery, handleSubmit }) {
	return (
		<form className={"wrapper"} onSubmit={handleSubmit}>
			<button className={"btn btn-ui"} type={"submit"}>
				<Search className={"icon"} />
			</button>
			<input
				type={"text"}
				placeholder={"Overhead Squats"}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			></input>
		</form>
	);
}

export default SearchBar;
