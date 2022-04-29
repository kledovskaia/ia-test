type InferArgType<T> = T extends (r: infer R) => void ? R : never;

type Message = {
  attachments: Attachment[];
  author: string;
  channel: string;
  content: string;
  date: string;
  id: string;
  region: string;
  senderNumber: string;
  avatar?: string;
};

type Attachment = {
  type: string;
  url: string;
};
