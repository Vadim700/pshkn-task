'use client';
import React, { useState } from 'react';
import styles from './style.module.scss';
import { createPortal } from 'react-dom';
import { Plus } from 'lucide-react';
import { AddPostForm } from '../AddPostForm/component';
import { useLockBodyScroll, useToggle } from 'react-use';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
  dalay: number;
}

export const NewPostModal: React.FC<Props> = ({ className, dalay }) => {
  const [isModal, setIsModal] = useState(false);
  const [locked, toggleLocked] = useToggle(false);

  useLockBodyScroll(locked);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleLocked();
    setIsModal(true);
  };

  if (typeof window !== 'undefined') {
    if (isModal && typeof window !== 'undefined') {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.3,
        delay: dalay * 0.1,
        ease: 'easeOut',
      }}
      layout
    >
      <>
        {isModal &&
          createPortal(
            <div className={styles.modal}>
              <AddPostForm
                onCloseModal={() => setIsModal(false)}
                toggleLockBody={toggleLocked}
              />
            </div>,
            document.body,
          )}
        <button
          className={styles.button}
          onClick={handleClick}
          title="Add new post"
        >
          <Plus size={100} />
        </button>
      </>
    </motion.div>
  );
};
