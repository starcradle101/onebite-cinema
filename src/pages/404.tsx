import { useRouter } from 'next/router';
import styles from '../styles/404.module.css';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>페이지를 찾을 수 없습니다</p>
        <button onClick={() => router.push('/')} className={styles.button}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
