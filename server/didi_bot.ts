import {events} from '../common.js';
import {MessageModel} from './message_model.js';

export class DidiBot {
    private static MESSAGE: string[] = [
      'e morreu'
    ]

    private static TIME_RESPONSE: number = 555;

    public static NAME: string = 'didi';

    wasMentioned(msg:string):boolean {
      let _msg = msg.toLowerCase();
      let _pao = _msg.indexOf('pão') > -1;
      let _ceu = _msg.indexOf('céu') > -1;
      let _mamae = _msg.indexOf('mamãe') > -1;
      let _crianca = _msg.indexOf('criança') > -1;

      return _pao || _ceu || _mamae || _crianca;
    }

    respond(io: SocketIOStatic):void {
      let _msg = new MessageModel()
                  .withUser(DidiBot.NAME)
                  .withMessage(DidiBot.MESSAGE)
                  .isBot(true);

      setTimeout(() => {
        io.emit(events.MESSAGE, _msg);
      }, DidiBot.TIME_RESPONSE);
    }

    static build():DidiBot {
      return new DidiBot();
    }
}
