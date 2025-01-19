'use client';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import styles from './style.module.scss';
import { PostItem } from '../PostItem/component';
import { Post } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';

import {
  deletePost,
  fetchPosts,
  togglePostSelection,
} from '@/lib/store/postsSlice';
import { NewPostModal } from '../newPostModal/component';
import { Loader } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface Props {
  className?: string;
}

export const PostsList: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error } = useSelector(
    (state: RootState) => state.posts,
  );

  useEffect(() => {
    if (status === 'start') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <Loader className={styles.loader} size={32} />
        LOADING...
      </div>
    );
  }

  if (status === 'failed') {
    return <div className={styles.error}>ERROR: {error}</div>;
  }

  let dalay = 0;

  return (
    <AnimatePresence mode="popLayout">
      <ul className={classNames(className, styles.list)}>
        <>
          {posts.map((post: Post, index: number) => {
            dalay = index;
            return (
              <li className={styles.listItem} key={post.id}>
                <PostItem
                  className={styles.post}
                  post={post}
                  onDelete={() => dispatch(deletePost(post.id))}
                  onSelect={() => dispatch(togglePostSelection(post.id))}
                  index={index}
                />
              </li>
            );
          })}
          <li>
            <NewPostModal dalay={dalay + 1} />
          </li>
        </>
      </ul>
    </AnimatePresence>
  );
};
