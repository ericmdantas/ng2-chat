import {MessageModel} from './message_model.js';
import {events} from './events.js';

export class PorteiroBot {
  public static NAME: string = 'porteiro';

  public talk(socket: WebSocket, user: string):void {
    let _hour = new Date().getHours();

    let _msg = new MessageModel()
                    .withUser(PorteiroBot.NAME)
                    .isBot(true);

    if (_hour < 12) {
      return socket.emit(events.MESSAGE, _msg.withMessage(`Bom dia, ${user}! :D`));
    }

    if ((_hour > 12) && (_hour < 18)) {
      return socket.emit(events.MESSAGE, _msg.withMessage(`Boa tarde, ${user}! :D`));
    }

    if (_hour > 18) {
      return socket.emit(events.MESSAGE, _msg.withMessage(`Boa noite, ${user}! :D`));
    }
  }

  public static build():PorteiroBot {
    return new PorteiroBot();
  }
}
