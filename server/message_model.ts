import {IMessage} from './interfaces.js';

export class MessageModel implements IMessage {
  user: string;
  sentAt: string = new Date().toString();
  message: string;
  bot: boolean;

  withUser(u:string):MessageModel {
    this.user = u;

    return this;
  }

  withMessage(m: string):MessageModel {
    this.message = m;
    return this;
  }

  isBot(b: boolean):MessageModel {
    this.bot = b;
    return this;
  }
}
