import {events} from '../../common.js';
import {MessageModel} from '../message_model.js';

export class ScottyBot {
  static NAME: string = 'scotty';

  wasMentioned(message:string):boolean {
    let _msg = message.toLowerCase();

    return (_msg === "scotty") || (_msg === "beam me up") || (_msg === "up") || (_msg === "arriba");
  }

  beamUp(io: SocketIOStatic) {
    let _msg = new MessageModel()
                    .withUser(ScottyBot.NAME)
                    .withMessage("")
                    .isBot(true);

    this._teletransport(io, _msg, events.MESSAGE);
  }

  private _teletransport(io, msg, event) {
    const MAX_COUNT = 50;
    let count = 0;

    let _idInterval = setInterval(() => {
      if (count >= MAX_COUNT) {
        return clearInterval(_idInterval);
      }

      io.emit(event, msg);

      count++;
    }, 33);
  }

  static build():ScottyBot {
    return new ScottyBot();
  }
}
