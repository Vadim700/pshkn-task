import styles from './page.module.scss';
import { PostsList } from '../components/PostsList/component';

export default function Home() {
  return (
    <main className={styles.main}>
      <PostsList className={styles.list} />
    </main>
  );
}
