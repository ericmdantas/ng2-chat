import {MessageModel} from './message_model.js';
import {events} from './events.js';

export class FelipeSmithBot {
  private static TALK_TIME: number = 1000 * 60 * 30; // meia hora

  private static BOT_MESSAGES: string[] = [
    "JULIANA?!",
    "Bruno? Embaixo da ponte?",
    "faz isso comigo não, velho",
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
    "O MEU PAI?!",
    "Sai dae, doido! Cê é mó playboy!",
    "É óbvio, velho!",
    "Romero Britto?!",
    "meu braço, velho! Vai quebrar! O meu braço!",
    "samu?",
    "arquitetura?",
    "( ͡° ͜ʖ ͡°)",
    "ᕦ( ͡° ͜ʖ ͡°)ᕤ",
    "arquitetura?",
    "mata o papai"
  ];

  public scheduleTalk(io: SocketIOStatic, mCount: {num: number}):void {
    this._scheduleTalk(io, mCount, 1000);
  }

  private _scheduleTalk(io, mCount, t: number) {
    let _id = setTimeout(() => {
      io.emit(events.MESSAGE, this._talk());
      io.emit(events.MESSAGE_COUNT, mCount.num++);

      clearTimeout(_id);

      this._scheduleTalk(io, mCount, Math.floor(Math.random() * FelipeSmithBot.TALK_TIME));
    }, t);
  }

  private _talk():MessageModel {
    let _msg = FelipeSmithBot.BOT_MESSAGES[Math.floor(Math.random() * FelipeSmithBot.BOT_MESSAGES.length)];
    let _date = new Date().toString();

    return new MessageModel()
            .withUser("felipe.smith")
            .withMessage(_msg)
            .isBot(true);
  }

  static build():FelipeSmithBot {
      return new FelipeSmithBot();
  }
}
