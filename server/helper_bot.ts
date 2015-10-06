import {events} from '../common.js';
import {MessageModel} from './message_model.js';

export class HelperBot {
  private static NAME: string = 'helper';
  private static HELP_STUFF: string = 'ls | exit | cls | @nome';

  talk(socket: SocketIOStatic):void {
    let _msg = new MessageModel()
                    .withUser(HelperBot.NAME)
                    .withMessage(HelperBot.HELP_STUFF)
                    .isBot(true);

    socket.emit(events.MESSAGE, _msg);
  }

  wasMentioned(msg: string):boolean {
    let _msg = msg.toLowerCase()

    return (_msg === "help") || (_msg === "/help") || (_msg === "--help");
  }

  public static build():HelperBot {
    return new HelperBot();
  }
}
