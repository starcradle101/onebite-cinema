import SearchableLayout from '@/components/searchable-layout';
import { ReactNode, useEffect, useState } from 'react';
import fetchMovieSearchResult from '@/lib/fetchMovieSearchResult';
import MovieItem from '@/components/movie-item';
import styles from './index.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Page() {
	const [movies, setMovies] = useState<MovieData[]>([]);

	const router = useRouter();
	const { q } = router.query;

	const fetchSearchResult = async () => {
		const result = await fetchMovieSearchResult(q as string);
		setMovies(result);
	};

	useEffect(() => {
		if (q) {
			fetchSearchResult();
		}
	}, [q]);

	return (
		<>
			<Head>
				<title>한입 씨네마</title>
				<meta property='og:image' content='/thumbnail.png' />
				<meta property='og:title' content='한입 씨네마 - 검색 결과' />
				<meta
					property='og:description'
					content='한입 씨네마에 등록된 영화들을 만나보세요!'
				/>
			</Head>
			<div className={styles.container}>
				<div className={styles.movieGrid}>
					{movies.map((movie) => (
						<MovieItem key={movie.id} movie={movie} />
					))}
				</div>
			</div>
		</>
	);
}

Page.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
