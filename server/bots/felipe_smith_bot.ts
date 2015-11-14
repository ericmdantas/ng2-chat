import {MessageModel} from '../message_model.js';
import {events} from '../../common.js';

export class FelipeSmithBot {
  public static NAME: string = 'felipe.smith';
  private static TALK_TIME: number = 1000 * 60 * 60; // 1 hour

  private static BOT_MESSAGES: string[] = [
    "JULIANA?!",
    "Bruno? Embaixo da ponte?",
    "faz isso comigo não, velho",
    "gente, quantos anos eu tenho?",
    "felipe!",
    "smith!",
    "16 18",
    "seu cu",
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
    "mata o papai"
  ];

  private static BOT_MESSAGES_RESPONSE: string[] = [
    'e daí?',
    'se eu to chamando?',
    'brigado',
    'hahahah.. não',
    "samu?",
    'ᕦ( ͡° ͜ʖ ͡°)ᕤ',
    'é óbvio, velho!',
    'culpa da dilma',
    'podia ser pior...',
    'rs',
    'pera',
    'viaja não',
    'sei lá',
    'não sei',
    'que?',
    'eae',
    'oi',
    'não',
    'cê é o bichão memo, hein doido',
    'sim',
    'calma',
    'partiu almoço',
    ':D',
    ':(',
    'valeu',
    'nada a ver',
    '¬¬',
    ':´(',
    'depende.. ( ͡° ͜ʖ ͡°)',
    '25 reais é 25 reais.. ( ͡° ͜ʖ ͡°)'
  ];

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
            .withUser(FelipeSmithBot.NAME)
            .withMessage(_msg)
            .isBot(true);
  }

  public respond():MessageModel {
    let _msg = FelipeSmithBot.BOT_MESSAGES_RESPONSE[Math.floor(Math.random() * FelipeSmithBot.BOT_MESSAGES_RESPONSE.length)];
    let _date = new Date().toString();

    return new MessageModel()
            .withUser(FelipeSmithBot.NAME)
            .withMessage(_msg)
            .isBot(true);
  }

  public wasMentioned(info: string):boolean {
    let _msg = info.toLowerCase();
    return (~_msg.indexOf("felipe")) || (~_msg.indexOf("smith"));
  }

  static build():FelipeSmithBot {
      return new FelipeSmithBot();
  }
}
