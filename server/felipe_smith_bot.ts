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

  private static BOT_MESSAGES_RESPONSE: string[] = [
    'e daí?',
    'se eu to chamando?',
    'brigado',
    'hahahah ah ah.. não',
    'ᕦ( ͡° ͜ʖ ͡°)ᕤ',
    'é óbvio, velho!',
    'culpa da dilma',
    'podia ser pior...',
    'rs',
    'viaja não',
    'dólar ta 7 reais, velho!',
    'oi oi',
    'não entendi o que ele falou',
    'não',
    'sim',
    'depende.. ( ͡° ͜ʖ ͡°)',
    '25 reais é 25 reais..'
  ]

  public scheduleTalk(io: SocketIOStatic, mCount: {num: number}):void {
    this._scheduleTalk(io, mCount, 1000);
  }

  private _scheduleTalk(io, mCount, t: number) {
    let _id = setTimeout(() => {
      io.emit(events.MESSAGE, this.talk());
      io.emit(events.MESSAGE_COUNT, mCount.num++);

      clearTimeout(_id);

      this._scheduleTalk(io, mCount, Math.floor(Math.random() * FelipeSmithBot.TALK_TIME));
    }, t);
  }

  public talk():MessageModel {
    let _msg = FelipeSmithBot.BOT_MESSAGES[Math.floor(Math.random() * FelipeSmithBot.BOT_MESSAGES.length)];
    let _date = new Date().toString();

    return new MessageModel()
            .withUser("felipe.smith")
            .withMessage(_msg)
            .isBot(true);
  }

  public respond():MessageModel {
    let _msg = FelipeSmithBot.BOT_MESSAGES_RESPONSE[Math.floor(Math.random() * FelipeSmithBot.BOT_MESSAGES_RESPONSE.length)];
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
