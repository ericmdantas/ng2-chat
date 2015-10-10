import {events} from '../commons.js';

export class StatsBot {
  private static NAME: string = 'stats';

  public respond(socket: SocketIOStatic):void {

  }

  public wasMentioned(msg: string):boolean {
    return (msg.toLowerCase().indexOf("stat") > -1) || (msg.toLowerCase().indexOf("stats") > -1) || (msg.toLowerCase().indexOf("status") > -1);
  }

  static build():StatsBot {
    return new StatsBot();
  }
}
