import {FelipeSmithBot} from './felipe_smith_bot';
import {X9Bot} from './x9_bot';
import {PorteiroBot} from './porteiro_bot';
import {DidiBot} from './didi_bot';
import {HelperBot} from './helper_bot';
import {StatsBot} from './stats_bot';
import {ScottyBot} from './scotty_bot';
import {MibBot} from './mib_bot';
import {FightBot} from './fight_bot';
import {AdminBot} from './admin_bot';

export class BotFactory {
  static create(token) {
    switch (token) {
      case "felipe.smith": return FelipeSmithBot.build();
      case "x9": return X9Bot.build();
      case "porteiro": return PorteiroBot.build();
      case "didi": return DidiBot.build();
      case "helper": return HelperBot.build();
      case "stats": return StatsBot.build();
      case "scotty": return ScottyBot.build();
      case "mib": return MibBot.build();
      case "fight": return FightBot.build();
      case "admin": return AdminBot.build();
    }
  }
}
