import {MessageModel} from './message_model.js';

const BOT_MESSAGES: string[] = [
  "JULIANA?!",
  "Bruno? Embaixo da ponte?",
  "faz isso comigo não, velho",
  "aeHOOOOOOOOOOOOOOOOOOOOOOO",
  "gente, quantos anos eu tenho?",
  "rafinha bombom :B",
  "felipe!",
  "smith!",
  "16 18",
  "JARBAS?!",
  "Meu braço ta branco, velho!",
  "Guarapari, Búzios minha arte",
  "Romero Britto?!",
  "meu braço, véio! Vai quebrar! O meu braço!",
  "samu?",
  "arquitetura?",
  "mata o papai"
]

export class BotTalk {
  private static TALK_TIME: number = 1000 * 60 * 30; // meia hora

  public scheduleTalk(io: SocketIOStatic, m: string):void {
    this._scheduleTalk(io, m, 1000);
  }

  private _scheduleTalk(io, m: string, t: number) {
    let _id = setTimeout(() => {
      io.emit(m, this._talk());

      clearTimeout(_id);

      this._scheduleTalk(io, m, Math.floor(Math.random() * BotTalk.TALK_TIME));
    }, t);
  }

  private _talk():MessageModel {
    let _msg = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
    let _user = "felipe.smith";
    let _date = new Date().toString();

    return new MessageModel()
            .withUser(_user)
            .withMessage(_msg)
            .withSentAt(_date)
            .isBot(true);
  }
}
