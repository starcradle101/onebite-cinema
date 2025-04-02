import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchMovieDetail from '@/lib/fetchMovieDetail';
import styles from './[id].module.css';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const movieDetail = await fetchMovieDetail(Number(id));

  return {
    props: {
      movieDetail,
    },
  };
};

export default function Page({
  movieDetail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (movieDetail === null) {
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
