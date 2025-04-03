import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchMovieDetail from '@/lib/fetchMovieDetail';
import styles from './[id].module.css';
import { useRouter } from 'next/router';
import fetchAllMovies from '@/lib/fetchAllMovies';

export const getStaticPaths = async () => {
  const allMovies = await fetchAllMovies();
  const paths = allMovies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movieDetail = await fetchMovieDetail(Number(id));

  if (!movieDetail) return { notFound: true };

  return {
    props: {
      movieDetail,
    },
  };
};

export default function Page({
  movieDetail,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return <div>로딩 중입니다...</div>;
  if (!movieDetail) {
    return <div>영화 정보를 찾을 수 없습니다.</div>;
  }

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movieDetail;

  return (
    <div className={styles.container}>
      <div
        className={styles.poster_img_container}
        style={{
          backgroundImage: `url(${posterImgUrl})`,
        }}
      >
        <img src={posterImgUrl} alt={title} />
      </div>
      <div className={styles.title}>{title}</div>
      <div>
        {releaseDate} / {genres.join(', ')} / {runtime}분
      </div>
      <div className={styles.company}>{company}</div>
      <div className={styles.subTitle}>{subTitle}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
