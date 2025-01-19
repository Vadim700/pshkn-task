import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import styles from './style.module.scss';
import { useDispatch } from 'react-redux';
import { addNewPost } from '@/lib/store/postsSlice';
import { AppDispatch } from '@/lib/store/store';
import { Loader, X } from 'lucide-react';
import { useClickAway, useKey } from 'react-use';

interface Props {
  className?: string;
  onCloseModal: () => void;
  toggleLockBody: () => void;
}

export const AddPostForm: React.FC<Props> = ({
  className,
  onCloseModal,
  toggleLockBody,
}) => {
  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const refModal = useRef(null);
  useClickAway(refModal, () => {
    onCloseModal();
    toggleLockBody();
  });

  useKey('Escape', () => {
    onCloseModal();
    toggleLockBody();
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await dispatch(
        addNewPost({
          userId: 1,
          title: titleValue,
          body: bodyValue,
          selected: false,
        }),
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      onCloseModal();
      toggleLockBody();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCloseModal();
    toggleLockBody();
  };

  return (
    <div className={styles.root} ref={refModal}>
      <button className={styles.close} onClick={handleClick}>
        <X />
      </button>
      <form
        className={classNames(className, styles.form)}
        onSubmit={handleSubmit}
      >
        <label htmlFor="" className={styles.label}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className={styles.input}
            value={titleValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitleValue(e.target.value)
            }
          />
        </label>
        <label htmlFor="" className={styles.label}>
          <textarea
            name="body"
            placeholder="Message"
            className={styles.textarea}
            value={bodyValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setBodyValue(e.target.value)
            }
          />
        </label>
        <button type="submit" className={styles.button}>
          {isLoading ? <Loader className={styles.loader} /> : 'Submit'}
        </button>
      </form>
    </div>
  );
};
