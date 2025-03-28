import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import movies from '@/dummy.json';
import MovieItem from '@/components/movie-item';
import styles from './index.module.css';

export default function Home() {
	return (
		<div>
			<section className={styles.section}>
				<h2>지금 가장 추천하는 영화</h2>
				<div className={styles.recommendedMovies}>
					{movies.slice(0, 3).map((movie) => (
						<MovieItem key={movie.id} movie={movie} />
					))}
				</div>
			</section>
			<section className={styles.section}>
				<h3>등록된 모든 영화</h3>
				<div className={styles.movieGrid}>
					{movies.map((movie) => (
						<MovieItem key={movie.id} movie={movie} />
					))}
				</div>
			</section>
		</div>
	);
}

Home.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
