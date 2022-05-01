import { Fragment, memo, useCallback, useState } from 'react';
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import ImageFallback from '../../assets/avatar.png';
import styles from './Message.module.scss';
import { getTimeFromString } from '../../helpers';
import { ReactComponent as StarIcon } from '../../assets/star.svg';

const CONTENT_CHAR_LIMIT = 250;

type Props = {
  message: Message;
  handleClick: (params: {
    id: Message['id'];
    isFavorite: Message['isFavorite'];
  }) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

const Message: FC<Props> = ({ handleClick, className, message, ...props }) => {
  const [contentShown, setContentShown] = useState(
    message.content.length < CONTENT_CHAR_LIMIT
      ? message.content
      : message.content.slice(0, CONTENT_CHAR_LIMIT).replace(/[^\s]+$/, '')
  );
  const [isMoreButtonShown, setIsMoreButtonShown] = useState(
    message.content.length > contentShown.length
  );

  const handleMoreClick = useCallback(() => {
    setIsMoreButtonShown(false);
    for (
      let i = 0, j = contentShown.length;
      j < message.content.length;
      i++, j++
    ) {
      setTimeout(() => {
        setContentShown((state) => state + message.content[j]);
      }, i * 10);
    }
  }, []);

  const handleStarClick = useCallback(() => {
    console.log(message.id);
    handleClick({
      id: message.id,
      isFavorite: !message.isFavorite,
    });
  }, [message, handleClick]);

  return (
    <section className={cn(className, styles.message)} {...props}>
      <div className={styles.message__controls}>
        <button
          onClick={handleStarClick}
          className={cn(styles.message__iconButton, {
            [styles.message__iconButton_active]: message.isFavorite,
          })}
        >
          <StarIcon />
        </button>
      </div>
      <div className={styles.message__avatar}>
        <img src={message?.avatar || ImageFallback} alt={message.author} />
      </div>
      <h3 className={styles.message__author}>
        {message.author || message.senderNumber}
      </h3>
      <time className={styles.message__date}>
        {getTimeFromString(message.date)}
      </time>
      <h2 className={styles.message__channel}>{message.channel}</h2>
      {message.content && (
        <>
          <p className={styles.message__content}>{contentShown}</p>
          {isMoreButtonShown && (
            <button onClick={handleMoreClick} className={styles.message__more}>
              Далее
            </button>
          )}
        </>
      )}
      {!!message.attachments.length && (
        <div className={styles.message__attachments}>
          {message.attachments.map((item) => (
            <Fragment key={item.url}>
              {item.type === 'image' && <img src={item.url} alt="attachment" />}
              {item.type === 'video' && (
                <video controls>
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
};
export default memo(Message);
