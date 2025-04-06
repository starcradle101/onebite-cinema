import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchMovieDetail from '@/lib/fetchMovieDetail';
import styles from './[id].module.css';
import { useRouter } from 'next/router';
import fetchAllMovies from '@/lib/fetchAllMovies';
import Head from 'next/head';

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

	if (router.isFallback)
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
				<div>로딩 중입니다...</div>
			</>
		);
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
		<>
			<Head>
				<title>{title}</title>
				<meta property='og:image' content={posterImgUrl} />
				<meta property='og:title' content={title} />
				<meta property='og:description' content={description} />
			</Head>
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
		</>
	);
}
