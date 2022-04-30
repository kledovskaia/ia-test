import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';
import { useMessages } from './hooks/useMessages';
import cn from 'classnames';
import styles from './App.module.scss';
import Message from './components/Message/Message';
import MessagesFeed from './components/MessagesFeed/MessagesFeed';
import { ReactComponent as ArrowIcon } from './assets/arrow-down.svg';

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

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const App: FC<Props> = ({ className, ...props }) => {
  const { data: messages, loading, error } = useMessages();
  const lastMessage = useRef<HTMLLIElement>(null);
  const previousOffsetTop = useRef(0);
  const airSpace = useRef<HTMLButtonElement>(null);
  const messagesContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lastMessage.current) return;
    if (!messagesContainer.current) return;
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

  return (
    <>
      <div className={cn(className, styles.app)} {...props}>
        <button
          className={cn(styles.app__button, styles.app__button_down)}
          onClick={handleScrollBottom}
        >
          <span>
            <ArrowIcon />
          </span>
        </button>
        <div className={styles.app__content} ref={messagesContainer}>
          <MessagesFeed>
            {messages.map((message, index) => (
              <li
                key={`${index}-${message.id}`}
                ref={index === messages.length - 1 ? lastMessage : null}
              >
                <Message message={message} />
              </li>
            ))}
          </MessagesFeed>
        </div>
        <button
          className={cn(styles.app__button, styles.app__button_up)}
          ref={airSpace}
          onClick={handleScrollTop}
        >
          <span>
            <ArrowIcon />
          </span>
        </button>
      </div>
    </>
  );
};

export default App;
