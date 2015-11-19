import {MessageModel} from '../message_model';
import {events} from '../../common';

export class PorteiroBot {
  static NAME = 'porteiro';

  talk(socket, user) {
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

  static build() {
    return new PorteiroBot();
  }
}
