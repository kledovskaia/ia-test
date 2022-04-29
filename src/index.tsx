import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// let lastAlreadyFetchedMessage = [...newMessages]
//       .reverse()
//       .find((message) => message.id === lastMessage.id);
//     while (!lastAlreadyFetchedMessage) {
//       let previousMessages = await getMessages({
//         oldMessages: true,
//         messageId: newMessages[0].id,
//       });
//       if (!previousMessages.length) return newMessages;
//       newMessages.unshift(...previousMessages);
//       lastAlreadyFetchedMessage = [...newMessages]
//         .reverse()
//         .find((message) => message.id === lastMessage.id);
//     }

//     if (lastAlreadyFetchedMessage) {
//       const lastAlreadyFetchedMessageIndex = newMessages.findIndex(
//         (item) => item.id === lastAlreadyFetchedMessage?.id
//       );

//       if (lastAlreadyFetchedMessageIndex !== -1) {
//         return newMessages.slice(
//           -(newMessages.length - 1 - lastAlreadyFetchedMessageIndex)
//         );
//       }
//     } else {
//       return newMessages;
//     }
