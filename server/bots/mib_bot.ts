import {events} from '../../common.js';
import {MessageModel} from '../message_model.js';

export class MibBot {
  static NAME: string = 'mib';
  static TIME: number = 3000 * 60 * 60; // 3 hours

  scheduleTalk(io: SocketIOStatic) {
    let _afterMsg = new MessageModel()
                    .withUser(MibBot.NAME)
                    .withMessage("<FLASH> não aconteceu nada, vida que segue")
                    .isBot(true);

    this._doTheJob(io, _afterMsg);
  }

  private _doTheJob(io:SocketIOStatic, msg: MessageModel) {
    let idTimeout = setTimeout(() => {
      io.emit(events.AMNESIA);
      io.emit(events.MESSAGE, msg);

      clearTimeout(idTimeout);

      this._doTheJob(io, msg);
    }, Math.floor(Math.random() * MibBot.TIME));
  }

  static build():MibBot {
    return new MibBot();
  }
}
