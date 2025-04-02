import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchMovieSearchResult from '@/lib/fetchMovieSearchResult';
import MovieItem from '@/components/movie-item';
import styles from './index.module.css';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const movies = await fetchMovieSearchResult(q as string);

  return {
    props: {
      movies,
    },
  };
};

export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
