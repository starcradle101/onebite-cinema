export default async function fetchAllMovies(): Promise<MovieData[]> {
	const url = 'https://onebite-cinema-api-main-lyart.vercel.app/movie';

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error();
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		return [];
	}
}
