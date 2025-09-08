import "./_Selected.scss";

import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch.jsx";

function Selected({ selected }) {
	const [data, setData] = useState(null);
	const [usedCache, setUsedCache] = useState(false);

	const cacheKey = `yt-${selected?.id}`;

	useEffect(() => {
		setData(null);
		setUsedCache(false);

		if (!selected) return;

		const stored = localStorage.getItem(cacheKey);
		if (stored) {
			setData(JSON.parse(stored));
			setUsedCache(true);
		}
	}, [selected, cacheKey]);

	const shouldFetch = selected && !usedCache;
	const {
		data: apiData,
		loading,
		error,
	} = useFetch(
		shouldFetch
			? `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
					`how to ${selected.name}`,
				)}&type=video&maxResults=1&key=${import.meta.env.VITE_API_YOUTUBE_KEY}`
			: null,
	);

	useEffect(() => {
		if (apiData && !usedCache) {
			localStorage.setItem(cacheKey, JSON.stringify(apiData));
			setData(apiData);
		}
	}, [apiData, cacheKey, usedCache]);

	if (!selected)
		return (
			<article>
				<p>Select an exercise</p>
			</article>
		);
	if (!data && loading)
		return (
			<article>
				<p>Loading...</p>
			</article>
		);
	if (!data && error)
		return (
			<article>
				<p>Something went wrong</p>
			</article>
		);

	const item = data?.items?.[0];
	if (!item) return <p>No video found.</p>;

	return (
		<article>
			<iframe
				className="video"
				src={`https://www.youtube.com/embed/${item.id.videoId}`}
				title={item.snippet.title}
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>

			<div className="detail">
				<h2>{selected.name}</h2>
				<div className="tags">
					<span className="category">{selected.category}</span>
				</div>
				<p className="description">{selected.description}</p>
			</div>
		</article>
	);
}

export default Selected;
