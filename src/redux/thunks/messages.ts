import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMessages } from '../../lib/messageAPI';
import { RootState } from '../store';

export const fetchMessages = createAsyncThunk<
  Message[],
  InferArgType<typeof getMessages>,
  { state: RootState }
>('messages/fetchMessages', async (payload, { getState }) => {
  const state = getState();
  const mostResentMessage = state.messages.data[state.messages.data.length - 1];

  let newMessages: Message[] = [];

  if (payload) {
    newMessages = await getMessages(payload);
  } else if (!mostResentMessage) {
    newMessages = await getMessages();
  } else {
    newMessages = await getMessages({
      messageId: mostResentMessage.id,
    });
    // Если бы сообщения были действительно новыми, то:
    // Проверить наличие в полученном массиве
    // сообщения с id === mostResentMessage.id,
    // и до тех пор, пока в ответе не будет содержаться
    // такое сообщение, запрашивать новые порции
    // и собирать их вместе, когда в ответе появится
    // сообщение, которое у нас уже есть, удалить лишнюю часть
    // последнего ответа, собрать вместе с уже сохраненными полученными
    // сообщениями и вернуть результат
  }

  return newMessages;
});

export const loadPreviousMessages = createAsyncThunk<
  Message[],
  InferArgType<typeof getMessages>,
  { state: RootState }
>('messages/loadPrevious', async (payload, { getState }) => {
  const state = getState();
  const oldestMessage = state.messages.data[0];

  let previousMessages: Message[] = [];

  if (oldestMessage) {
    previousMessages = await getMessages({
      messageId: oldestMessage.id,
      oldMessages: true,
    });
  } else {
    previousMessages = await getMessages();
  }

  return previousMessages;
});
