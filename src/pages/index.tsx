import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import MovieItem from '@/components/movie-item';
import styles from './index.module.css';
import { InferGetServerSidePropsType } from 'next';
import fetchRandomMovies from '@/lib/fetchRandomMovies';
import fetchAllMovies from '@/lib/fetchAllMovies';

export const getServerSideProps = async () => {
  const [allMovies, recommendedMovies] = await Promise.all([
    fetchAllMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recommendedMovies,
    },
  };
};

export default function Home({
  allMovies,
  recommendedMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
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
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
