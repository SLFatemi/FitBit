import "./_SearchResults.scss";
import SearchResult from "../Result/SearchResult.jsx";

function SearchResults({ query, data, error, loading, setSelected, selected }) {
	if (!query && !data)
		return (
			<ul>
				<p>Start by searching</p>
			</ul>
		);
	if (loading)
		return (
			<ul>
				<p>Loading...</p>
			</ul>
		);
	if (error)
		return (
			<ul>
				<p>Something went wrong</p>
			</ul>
		);

	if (data?.length === 0)
		return (
			<ul>
				<p>No result.</p>
			</ul>
		);

	return (
		<ul>
			{data.map((res) => (
				<SearchResult
					selected={selected}
					setSelected={setSelected}
					result={res}
					key={res.id}
				/>
			))}
		</ul>
	);
}

export default SearchResults;
