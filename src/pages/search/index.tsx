import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import movies from '@/dummy.json';
import MovieItem from '@/components/movie-item';
import styles from './index.module.css';

export default function Page() {
	return (
		<div className={styles.container}>
			<div className={styles.movieGrid}>
				{movies.map((movie) => (
					<MovieItem key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
}

Page.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
