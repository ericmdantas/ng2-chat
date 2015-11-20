import {events} from '../../common';
import {MessageModel} from '../message_model';

export class HelperBot {
  static NAME = 'helper';
  static HELP_STUFF = 'ls | exit | cls | stats | @nome | up | fight';

  talk(socket) {
    let _msg = new MessageModel()
                    .withUser(HelperBot.NAME)
                    .withMessage(HelperBot.HELP_STUFF)
                    .isBot(true);

    socket.emit(events.MESSAGE, _msg);
  }

  wasMentioned(msg) {
    let _msg = msg.toLowerCase()

    return (_msg === "help") || (_msg === "/help") || (_msg === "--help") || (msg === "--h");
  }

  static build() {
    return new HelperBot();
  }
}
