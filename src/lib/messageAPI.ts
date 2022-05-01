import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'http://f0665380.xsph.ru/';

type RequestMessagesParams = {
  messageId?: string;
  oldMessages?: boolean;
};
type MessagesResponse = {
  Messages: Message[];
  likeItems: unknown[];
  dislikeItems: unknown[];
};

export const getMessages = async (payload?: RequestMessagesParams) => {
  try {
    const formData = new FormData();
    formData.append('actionName', 'MessagesLoad');
    if (payload) {
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
    }
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: formData,
    });
    const { Messages } = (await response.json()) as MessagesResponse;

    Messages?.forEach((m) => {
      m._id = uuidv4();
    });

    return Messages || [];
  } catch (error) {
    throw new Error(
      'Возможно, проблема в CORS.Установите расширение или запустите хром из консоли с флагами --args --disable-web-security --user-data-dir="/tmp/chrome_dev"'
    );
  }
};
