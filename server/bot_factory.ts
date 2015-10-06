import {FelipeSmithBot} from './felipe_smith_bot.js';
import {X9Bot} from './x9_bot.js';
import {PorteiroBot} from './porteiro_bot.js';
import {DidiBot} from './didi_bot.js';
import {HelperBot} from './helper_bot.js';

export class BotFactory {
  static create(token):void {
    switch(token) {
      case "felipe.smith": return FelipeSmithBot.build();
      case "x9": return X9Bot.build();
      case "porteiro": return PorteiroBot.build();
      case "didi": return DidiBot.build();
      case "helper": return HelperBot.build();
    }
  }
}
