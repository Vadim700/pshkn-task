import styles from './style.module.scss';
import classNames from 'classnames';
import { Post } from '@/types/types';
import { X } from 'lucide-react';
import { HTMLMotionProps, motion } from 'framer-motion';

interface Props extends HTMLMotionProps<'div'> {
  className?: string;
  post: Post;
  onDelete: () => void;
  onSelect: () => void;
  index: number;
}

export const PostItem = ({
  className,
  post,
  onDelete,
  onSelect,
  index,
}: Props) => {
  const handleDeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      layout
    >
      <div
        className={classNames(className, styles.root, {
          [styles.selected]: post.selected,
        })}
        onClick={() => onSelect()}
        id={String(post.id)}
      >
        <div className={styles.title}>
          <span className={styles.id}>{post.id}</span>
          {post.title}
        </div>
        <div className={styles.body}>{post.body}</div>
        <button className={styles.remove} onClick={handleDeletePost}>
          <X />
        </button>
      </div>
    </motion.div>
  );
};
