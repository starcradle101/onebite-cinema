export default async function fetchMovieDetail(
	id: number
): Promise<MovieData | null> {
	const url = `https://onebite-cinema-api-main-lyart.vercel.app/movie/${id}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error();
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
}
