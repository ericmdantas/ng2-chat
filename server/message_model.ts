import {IMessage} from './interfaces.js';

export class MessageModel implements IMessage {
  user: string;
  sentAt: string;
  message: string;
  bot: boolean;

  withUser(u:string):MessageModel {
    this.user = u;

    return this;
  }

  withSentAt(sa:string):MessageModel {
    this.sentAt = sa;
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
