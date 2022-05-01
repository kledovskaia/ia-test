import { useMessages } from './hooks/useMessages';
import Error from './components/Error/Error';
import Loader from './components/Loader/Loader';
import Feed from './components/Feed/Feed';
import Messages from './components/Messages/Messages';

const App = () => {
  const { data: messages, loading, error, loadPrevious } = useMessages();

  return (
    <>
      <Error error={error} />
      <Loader loading={loading && !messages.length} />

      <Feed>
        <Messages messages={messages} loadPrevious={loadPrevious} />
      </Feed>
    </>
  );
};

export default App;
