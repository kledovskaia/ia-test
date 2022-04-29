import { useEffect } from 'react';
import { useMessages } from './hooks/useMessages';

const App = () => {
  const { data, loading, error } = useMessages();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div className="App"></div>;
};

export default App;
