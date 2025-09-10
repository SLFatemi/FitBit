import "./_Selected.scss";

import { Bookmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch.jsx";

function Selected({ selected, setBookmarks, bookmarks }) {
	const [data, setData] = useState(null);
	const [usedCache, setUsedCache] = useState(false);
	const currentRequestRef = useRef(null);

	const isBookMarked = bookmarks.some((ex) => ex.id === selected?.id);

	useEffect(() => {
		setData(null);
		setUsedCache(false);

		if (currentRequestRef.current) {
			currentRequestRef.current.cancelled = true;
		}

		if (!selected) return;

		const requestId = selected.id;
		currentRequestRef.current = { id: requestId, cancelled: false };

		const cacheKey = `yt-${selected.id}`;
		const stored = localStorage.getItem(cacheKey);
		if (stored) {
			try {
				const parsedData = JSON.parse(stored);
				if (
					currentRequestRef.current &&
					currentRequestRef.current.id === requestId &&
					!currentRequestRef.current.cancelled
				) {
					setData(parsedData);
					setUsedCache(true);
				}
			} catch (error) {
				console.error("Error parsing cached data:", error);
				localStorage.removeItem(cacheKey);
			}
		}
	}, [selected]);

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
		if (apiData && !usedCache && selected) {
			if (
				currentRequestRef.current &&
				currentRequestRef.current.id === selected.id &&
				!currentRequestRef.current.cancelled
			) {
				const cacheKey = `yt-${selected.id}`;
				localStorage.setItem(cacheKey, JSON.stringify(apiData));
				setData(apiData);
			}
		}
	}, [apiData, usedCache, selected]);

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
				<span className={"bookmark-btn"}>
					<Bookmark
						className={`icon ${isBookMarked ? "filled" : ""}`}
						size={24}
						onClick={() =>
							setBookmarks((cur) =>
								isBookMarked
									? cur.filter((ex) => ex.id !== selected.id)
									: [...cur, selected],
							)
						}
					/>
				</span>
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
