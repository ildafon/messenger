import { User } from './user.model';


export interface Message {
  id: string;
  author: string | User;
  text: string;
  conversation: string;
  createdAt: string;
}

export interface MessageExt extends Message {
  author: User;
}
