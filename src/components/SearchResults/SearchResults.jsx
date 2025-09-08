import "./_SearchResults.scss";
import SearchResult from "../Result/SearchResult.jsx";

function SearchResults({ query, data, error, loading }) {
	if (!query)
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
				<SearchResult result={res} key={res.id} />
			))}
		</ul>
	);
}

export default SearchResults;
