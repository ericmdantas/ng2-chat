import {MessageModel} from './message_model.js';

const BOT_MESSAGES: string[] = [
  "wtf",
  "nego é foda",
  "aeHOOOOOOOOOOOOOOOOOOOOOOO",
  "pera",
  "rafinha bombom",
  "felipe...",
  "...smith",
  "16 18",
  "JARBAS?!",
  "Guarapari, Búzios minha arte",
  "Romero Britto?!",
  "meu braço, véio! Vai quebrar! O meu braço!",
  "to com fome",
  "hahahaha.. ai ai"
]

export class BotTalk {
  private static TALK_TIME: number = 1000 * 60 * 5; // 5 minutos

  public scheduleTalk(io: SocketIOStatic, m: string):void {
    setInterval(() => {
      io.emit(m, this._talk());
    }, BotTalk.TALK_TIME);
  }

  private _talk():MessageModel {
    return new MessageModel()
            .withUser("brot")
            .withMessage(BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)])
            .withSentAt(new Date().toString())
            .isBot(true);
  }
}
