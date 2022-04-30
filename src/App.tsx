import { DetailedHTMLProps, FC, HTMLAttributes, useCallback } from 'react';
import { useEffect, useRef } from 'react';
import { useMessages } from './hooks/useMessages';
import cn from 'classnames';
import styles from './App.module.scss';
import Message from './components/Message/Message';
import MessagesFeed from './components/MessagesFeed/MessagesFeed';
import { ReactComponent as ArrowIcon } from './assets/arrow-down.svg';
import { connect } from 'react-redux';
import { setIsFavorite } from './redux/slices/messages';
import { AppDispatch } from './redux/store';
import Error from './components/Error/Error';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import { useAutoScroll } from './hooks/useAutoScroll';

const handleScrollTop = () => {
  window.scroll({ left: 0, top: 0, behavior: 'smooth' });
};
const handleScrollBottom = () => {
  window.scroll({
    left: 0,
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};

type Props = ReturnType<typeof mapDispatchToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const App: FC<Props> = ({ setIsFavorite, className, ...props }) => {
  const { data: messages, loading, error } = useMessages();

  const { bottomRef } = useAutoScroll<HTMLLIElement>(messages);

  const handleSetIsFavorite = useCallback(
    (params: InferArgType<typeof setIsFavorite>) => setIsFavorite(params),
    [setIsFavorite]
  );

  const handleToggleOrder = () => {}; // TODO

  return (
    <>
      <div className={cn(className, styles.app)} {...props}>
        {!!messages.length && (
          <Button
            className={cn(styles.app__button, styles.app__button_up)}
            handleClick={handleScrollTop}
          >
            <ArrowIcon />
          </Button>
        )}

        <div className={styles.app__content}>
          {!!messages.length && <Button handleClick={handleToggleOrder} />}
          <Error />
          <Loader />

          <MessagesFeed>
            {messages.map((message, index) => (
              <li
                key={`${index}-${message.id}`}
                ref={index === messages.length - 1 ? bottomRef : null}
              >
                <Message handleClick={handleSetIsFavorite} message={message} />
              </li>
            ))}
          </MessagesFeed>
        </div>
        {!!messages.length && (
          <Button
            className={cn(styles.app__button, styles.app__button_down)}
            handleClick={handleScrollBottom}
          >
            <ArrowIcon />
          </Button>
        )}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setIsFavorite: (id: InferArgType<typeof setIsFavorite>) => {
    dispatch(setIsFavorite(id));
  },
});

export default connect(null, mapDispatchToProps)(App);
