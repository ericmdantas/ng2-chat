import * as _ from 'lodash';
import {events} from './events.js';
import {MessageModel} from './message_model.js';

export class X9Bot {
  public static NAME: string = 'x9';

  entered(socket:Object, user: string, conn:Object):void {
    let _usersAlreadyIn = _.keys(conn).join().replace(',', ', ');

    let _usersAlreadyInMsg = new MessageModel()
                          .withUser(X9Bot.NAME)
                          .withMessage(`${_usersAlreadyIn} estão no chat`)
                          .isBot(true);


    let _newUserIn = new MessageModel()
                    .withUser(X9Bot.NAME)
                    .withMessage(`${user} entrou`)
                    .isBot(true);

    socket.broadcast.emit(events.MESSAGE, _newUserIn);
    socket.emit(events.MESSAGE, _usersAlreadyInMsg);
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

  static build():X9Bot {
    return new X9Bot();
  }
}
