import {FelipeSmithBot} from './felipe_smith_bot.js';
import {X9Bot} from './x9_bot.js';
import {PorteiroBot} from './porteiro_bot.js';

export class BotFactory {
  static create(token):void {
    switch(token) {
      case "felipe.smith": return FelipeSmithBot.build();
      case "x9": return X9Bot.build();
      case "porteiro": return PorteiroBot.build();
    }
  }
}
