import {events} from './events.js';
import {MessageModel} from './message_model.js';

export class X9Bot {
  entered(io: SocketIOStatic, user: string):void {
    let _msg = new MessageModel()
                    .withUser("x9")
                    .withMessage(`${user} entrou no chat.`)
                    .isBot(true);

    io.emit(events.MESSAGE, _msg);
  }

  left(io: SocketIOStatic, user: string):void {
    let _msg = new MessageModel()
                    .withUser("x9")
                    .withMessage(`${user} saiu`)
                    .isBot(true);

    io.emit(events.MESSAGE, _msg);
  }

  static build():X9Bot {
    return new X9Bot();
  }
}
