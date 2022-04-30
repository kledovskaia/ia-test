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
  const lastMessage = useRef<HTMLLIElement>(null);
  const previousOffsetTop = useRef(0);
  const airSpace = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lastMessage.current) return;
    if (!airSpace.current) return;
    const difference = Math.abs(
      previousOffsetTop.current -
        (lastMessage.current.offsetTop + lastMessage.current.offsetHeight)
    );

    const shouldScroll =
      document.body.offsetHeight - window.scrollY - window.innerHeight <=
      difference;

    previousOffsetTop.current =
      lastMessage.current.offsetTop + lastMessage.current.offsetHeight;

    if (shouldScroll) {
      lastMessage.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSetIsFavorite = useCallback(
    (params: InferArgType<typeof setIsFavorite>) => setIsFavorite(params),
    [setIsFavorite]
  );

  return (
    <>
      <div className={cn(className, styles.app)} {...props}>
        <button
          className={cn(styles.app__button, styles.app__button_up)}
          onClick={handleScrollTop}
        >
          <ArrowIcon />
        </button>

        <div className={styles.app__content}>
          <MessagesFeed>
            {messages.map((message, index) => (
              <li
                key={`${index}-${message.id}`}
                ref={index === messages.length - 1 ? lastMessage : null}
              >
                <Message handleClick={handleSetIsFavorite} message={message} />
              </li>
            ))}
            <div ref={airSpace}></div>
          </MessagesFeed>
        </div>
        <button
          className={cn(styles.app__button, styles.app__button_down)}
          onClick={handleScrollBottom}
        >
          <ArrowIcon />
        </button>
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
