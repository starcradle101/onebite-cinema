import Link from 'next/link';
import styles from './movie-item.module.css';

export default function MovieItem({ movie }: { movie: MovieData }) {
	return (
		<Link href={`/movie/${movie.id}`} className={styles.link}>
			<img
				src={movie.posterImgUrl}
				alt={movie.title}
				className={styles.poster}
			/>
		</Link>
	);
}
