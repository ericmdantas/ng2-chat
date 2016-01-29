import {events} from '../../common';
import {MessageModel} from '../message_model';

export class DidiBot {
    static MESSAGE = [
      'e morreu'
    ];

    static TIME_RESPONSE = 555;

    static NAME = 'didi';

    wasMentioned(msg = '') {
      let _msg = msg.toLowerCase();
      let _pao = ~_msg.indexOf('pão');
      let _ceu = ~_msg.indexOf('céu');
      let _mamae = ~_msg.indexOf('mamãe');
      let _crianca = ~_msg.indexOf('criança');

      return !!(_pao || _ceu || _mamae || _crianca);
    }

    respond(io) {
      let _msg = new MessageModel()
                  .withUser(DidiBot.NAME)
                  .withMessage(DidiBot.MESSAGE)
                  .isBot(true);

      setTimeout(() => {
        io.emit(events.MESSAGE, _msg);
      }, DidiBot.TIME_RESPONSE);
    }

    static build() {
      return new DidiBot();
    }
}
