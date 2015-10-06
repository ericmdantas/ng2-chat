import * as _ from 'lodash';
import {events} from '../common.js';
import {MessageModel} from './message_model.js';

export class X9Bot {
  public static NAME: string = 'x9';

  entered(socket:Object, user: string, conn:Object):void {
    let _newUserIn = new MessageModel()
                    .withUser(X9Bot.NAME)
                    .withMessage(`${user} entrou`)
                    .isBot(true);

    socket.broadcast.emit(events.MESSAGE, _newUserIn);
    socket.emit(events.MESSAGE, this._usersOnline(conn));
  }

  left(socket: SocketIOStatic, user: string):void {
    let _msg = new MessageModel()
                    .withUser(X9Bot.NAME)
                    .withMessage(`${user} saiu`)
                    .isBot(true);

    socket.broadcast.emit(events.MESSAGE, _msg);
  }

  isTyping(socket: SocketIOStatic, user: string):void {
    let _msg = new MessageModel()
                .withUser(X9Bot.NAME)
                .withMessage(`${user} está digitando...`)
                .withHash(Date.now())
                .deleteIn(1000)
                .possibleToRepeat(false)
                .isBot(true);

    socket.broadcast.emit(events.TYPING, _msg);
  }

  wasMentioned(message: string) {
    return message.toLowerCase() === ('ls');
  }

  respondWhosOnline(socket: SocketIOStatic, conn: Object) {
    socket.emit(events.MESSAGE, this._usersOnline(conn));
  }

  private _usersOnline(conn: Map):MessageModel {
    let connIterator = conn.keys();
    let _usersTmp = [];

    conn.forEach((value, prop) => {
        _usersTmp.push(prop);
    });

    let _usersStringified = _usersTmp.join().replace(',', ', ');

    return new MessageModel()
            .withUser(X9Bot.NAME)
            .withMessage(`${_usersStringified} estão no chat`)
            .isBot(true);
  }

  static build():X9Bot {
    return new X9Bot();
  }
}
