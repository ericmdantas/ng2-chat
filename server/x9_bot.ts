import {events} from './events.js';
import {MessageModel} from './message_model.js';

export class X9Bot {
  static public NAME: string = 'x9';

  entered(io: SocketIOStatic, user: string):void {
    let _msg = new MessageModel()
                    .withUser(X9Bot.NAME)
                    .withMessage(`${user} entrou`)
                    .isBot(true);

    io.emit(events.MESSAGE, _msg);
  }

  left(io: SocketIOStatic, user: string):void {
    let _msg = new MessageModel()
                    .withUser(X9Bot.NAME)
                    .withMessage(`${user} saiu`)
                    .isBot(true);

    io.emit(events.MESSAGE, _msg);
  }

  isTyping(io: SocketIOStatic, user: string):void {
    let _msg = new MessageModel()
                .withUser(X9Bot.NAME)
                .withMessage(`${user} está digitando`)
                .withHash(Date.now())
                .deleteIn(1000)
                .possibleToRepeat(false)
                .isBot(true);

    io.emit(events.TYPING, _msg);
  }

  static build():X9Bot {
    return new X9Bot();
  }
}
