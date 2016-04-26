import {events} from '../../common';
import {MessageModel} from '../message_model';

export class X9Bot {
  static NAME = 'x9';

  entered(socket, user, conn) {
    let _newUserIn = new MessageModel()
                    .withUser(X9Bot.NAME)
                    .withMessage(`${user} entrou`)
                    .isBot(true);

    socket.broadcast.emit(events.MESSAGE, _newUserIn);
    this.respondWhosOnline(socket, conn);
  }

  left(socket, user) {
    let _msg = new MessageModel()
                    .withUser(X9Bot.NAME)
                    .withMessage(`${user} saiu`)
                    .isBot(true);

    socket.broadcast.emit(events.MESSAGE, _msg);
  }

  isTyping(socket, user, message) {
    let _msg = new MessageModel()
                .withUser(X9Bot.NAME)
                .withMessage(`${user}: ${message}`)
                .withHash(Date.now())
                .deleteIn(1000)
                .possibleToRepeat(false)
                .isBot(true);

    socket.broadcast.emit(events.TYPING, _msg);
  }

  wasMentioned(message = '') {
    return message.toLowerCase() === ('ls');
  }

  respondWhosOnline(socket, conn) {
    socket.emit(events.MESSAGE, this._usersOnlineMsg(conn));
  }

  _usersOnlineMsg(conn) {
    return new MessageModel()
            .withUser(X9Bot.NAME)
            .withMessage(`${this.usersOnline(conn)} estão no chat`)
            .isBot(true);
  }

  usersOnline(conn) {
    let connIterator = conn.keys();
    let _usersTmp = [];

    conn.forEach((value, prop) => {
        _usersTmp.push(prop);
    });

    return _usersTmp.join().replace(/,/g, ', ');
  }

  amountMsgs(msgs = {}) {
    return msgs.num;
  }

  static build() {
    return new X9Bot();
  }
}
