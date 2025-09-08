import { useEffect, useState } from "react";

function useFetch(url, options = {}) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <No need>
	useEffect(() => {
		if (!url) return;
		async function fetchData() {
			setLoading(true);
			setError(null);
			try {
				console.log("CALL");
				const res = await fetch(url, options);
				if (!res.ok) throw new Error(`There was an error ${res.status}`);

				setData(await res.json());
			} catch (e) {
				setError(e);
				setData(null);
			} finally {
				setLoading(false);
			}
			return null;
		}
		fetchData();
	}, [url]);
	return { data, loading, error };
}

export { useFetch };
