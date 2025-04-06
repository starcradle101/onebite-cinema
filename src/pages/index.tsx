import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import MovieItem from '@/components/movie-item';
import styles from './index.module.css';
import { InferGetStaticPropsType } from 'next';
import fetchRandomMovies from '@/lib/fetchRandomMovies';
import fetchAllMovies from '@/lib/fetchAllMovies';
import Head from 'next/head';

export const getStaticProps = async () => {
	const [allMovies, recommendedMovies] = await Promise.all([
		fetchAllMovies(),
		fetchRandomMovies(),
	]);

	return {
		props: {
			allMovies,
			recommendedMovies,
		},
		revalidate: 3600,
	};
};

export default function Home({
	allMovies,
	recommendedMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Head>
				<title>한입 씨네마</title>
				<meta property='og:image' content='/thumbnail.png' />
				<meta property='og:title' content='한입 씨네마' />
				<meta
					property='og:description'
					content='한입 씨네마에 등록된 영화들을 만나보세요!'
				/>
			</Head>
			<div>
				<section className={styles.section}>
					<h2>지금 가장 추천하는 영화</h2>
					<div className={styles.recommendedMovies}>
						{recommendedMovies.map((movie) => (
							<MovieItem key={movie.id} movie={movie} />
						))}
					</div>
				</section>
				<section className={styles.section}>
					<h3>등록된 모든 영화</h3>
					<div className={styles.movieGrid}>
						{allMovies.map((movie) => (
							<MovieItem key={movie.id} movie={movie} />
						))}
					</div>
				</section>
			</div>
		</>
	);
}

Home.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
