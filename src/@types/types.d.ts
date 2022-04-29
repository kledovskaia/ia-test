type InferArgType<T> = T extends (arg: infer R) => void ? R : never;

type Attachment = {
  type: string;
  url: string;
};

type Message = {
  attachments: TAttachment[];
  author: string;
  channel: string;
  content: string;
  date: string;
  id: string;
  region: string;
  senderNumber: string;
  avatar?: string;
};
