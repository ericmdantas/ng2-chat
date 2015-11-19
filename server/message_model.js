import {IMessage} from '../common';

export class MessageModel {
  sentAt = new Date().toString();
  message = '';
  bot = false;
  deleteTime = 0;
  hash = Date.now();
  canRepeat = true;

  withUser(u) {
    this.user = u;

    return this;
  }

  withMessage(m) {
    this.message = m;
    return this;
  }

  isBot(b) {
    this.bot = b;
    return this;
  }

  deleteIn(t) {
    this.deleteTime = t;
    return this;
  }

  withHash(h) {
    this.hash = h;
    return this;
  }

  possibleToRepeat(b) {
    this.canRepeat = b;
    return this;
  }
}
