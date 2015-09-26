import {IMessage} from './interfaces.js';

export class MessageModel implements MessageType {
  user: string;
  sentAt: string = new Date().toString();
  message: string;
  bot: boolean;
  deleteTime: number;
  hash: string | number = Date.now();
  canRepeat: boolean = true;

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

  deleteIn(t: number):MessageModel {
    this.deleteTime = t;
    return this;
  }

  withHash(h: string | number):MessageModel {
    this.hash = h;
    return this;
  }

  possibleToRepeat(b:boolean):MessageModel {
    this.canRepeat = b;
    return this;
  }
}
