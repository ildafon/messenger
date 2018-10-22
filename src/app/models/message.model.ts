import { User } from './user.model';


export interface Message {
  id: string;
  author: string | User;
  text: string;
  conversation: string | User;
  createdAt: string | Date;
}

export interface MessageExt extends Message {
  author: User;
  conversation: User;
}
