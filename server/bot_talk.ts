import {MessageModel} from './message_model.js';
import {events} from './events.js';

const BOT_MESSAGES: string[] = [
  "JULIANA?!",
  "Bruno? Embaixo da ponte?",
  "faz isso comigo não, velho",
  "aeHOOOOOOOOOOOOOOOOOOOOOOO",
  "gente, quantos anos eu tenho?",
  "felipe!",
  "smith!",
  "16 18",
  "JARBAS?!",
  "ADRIANO?",
  "Meu braço ta branco, velho!",
  "Guarapari, Búzios é minha arte",
  "brigado",
  "RAVE?!",
  "Marcelo não..",
  "Minha vida!",
  "Eu não sei nem onde eu tô, véi",
  "Antonela Caroline, meu gol?",
  "Cristiano Ronaldo?",
  "Minha arte PC Gusmão",
  "Milton Nascimento, velho",
  "seu cu",
  "O MEU PAI?!",
  "Sai dae, doido! Cê é mó playboy!",
  "É óbvio, velho!",
  "Romero Britto?!",
  "meu braço, véio! Vai quebrar! O meu braço!",
  "samu?",
  "arquitetura?",
  "mata o papai"
]

export class BotTalk {
  private static TALK_TIME: number = 1000 * 60 * 30; // meia hora

  public scheduleTalk(io: SocketIOStatic, mCount: {num: number}):void {
    this._scheduleTalk(io, mCount, 1000);
  }

  private _scheduleTalk(io, mCount, t: number) {
    let _id = setTimeout(() => {
      io.emit(events.MESSAGE, this._talk());
      io.emit(events.MESSAGE_COUNT, mCount.num++);

      clearTimeout(_id);

      this._scheduleTalk(io, mCount, Math.floor(Math.random() * BotTalk.TALK_TIME));
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
