import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react';
import { useEffect, useRef } from 'react';
import { useMessages } from './hooks/useMessages';
import cn from 'classnames';
import styles from './App.module.scss';
import Message from './components/Message/Message';
import MessagesFeed from './components/MessagesFeed/MessagesFeed';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const App: FC<Props> = ({ className, ...props }) => {
  const { data: messages, loading, error } = useMessages();
  const lastMessage = useRef<HTMLLIElement>(null);
  const previousOffsetTop = useRef(0);
  const messagesContainer = useRef<HTMLDivElement>(null);
  const airSpace = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lastMessage.current) return;
    if (!airSpace.current) return;
    const difference = Math.abs(
      previousOffsetTop.current - airSpace.current.offsetTop
    );

    const shouldScroll =
      document.body.offsetHeight - window.scrollY - window.innerHeight <=
      difference;

    previousOffsetTop.current = airSpace.current.offsetTop;

    if (shouldScroll) {
      lastMessage.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={cn(className, styles.container)} {...props}>
      <div ref={messagesContainer}>
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
        <div ref={airSpace}></div>
      </div>
    </div>
  );
};

export default App;
