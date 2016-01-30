import {events} from '../../common';
import {MessageModel} from '../message_model';

export class MibBot {
  static NAME = 'mib';
  static TIME = 24 * 1000 * 60 * 60; // 1 day

  scheduleTalk(io) {
    let _afterMsg = new MessageModel()
                    .withUser(MibBot.NAME)
                    .withMessage("<FLASH> não aconteceu nada, vida que segue")
                    .isBot(true);

    this._doTheJob(io, _afterMsg);
  }

  _doTheJob(io, msg) {
    let idTimeout = setTimeout(() => {
      io.emit(events.AMNESIA);
      io.emit(events.MESSAGE, msg);

      clearTimeout(idTimeout);

      this._doTheJob(io, msg);
    }, Math.floor(Math.random() * MibBot.TIME));
  }

  static build() {
    return new MibBot();
  }
}
