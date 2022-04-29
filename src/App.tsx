import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';
import { useMessages } from './hooks/useMessages';
import cn from 'classnames';
import styles from './App.module.scss';
import Message from './components/Message/Message';
import MessagesFeed from './components/MessagesFeed/MessagesFeed';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const App: FC<Props> = ({ className, ...props }) => {
  const { data: messages, loading, error } = useMessages();
  const airSpace = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!airSpace.current) return;
    const rect = airSpace.current.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    const isVisible = elementTop < window.innerHeight && elementBottom >= 0;
    if (isVisible) {
      airSpace.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={cn(className, styles.container)} {...props}>
      <MessagesFeed>
        {messages.map((message, index) => (
          <Message key={index + message.id} message={message} />
        ))}
      </MessagesFeed>
      <div style={{ minHeight: '100px' }} ref={airSpace}></div>
    </div>
  );
};

export default App;
