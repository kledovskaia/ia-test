import { useEffect, useRef } from 'react';
import { useMessages } from './hooks/useMessages';

const App = () => {
  const { data: messages, loading, error } = useMessages();
  const airSpace = useRef<HTMLLIElement>(null);

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
    <div className="App">
      <ul>
        {messages.map((message, index) => (
          // Так как сервер отдает фейковые новые сообщения,
          // у нас есть сущности с одинаковыми id,
          // поэтому пришлось сконкатенировать их с индексом,
          // в условиях с уникальными id, поменять на просто {variable}.id
          <li key={index + message.id}>{message.content}</li>
        ))}
        <li style={{ minHeight: '100px' }} ref={airSpace}></li>
      </ul>
    </div>
  );
};

export default App;
