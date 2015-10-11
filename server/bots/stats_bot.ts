import {events} from '../../common.js';
import {MessageModel} from '../message_model.js';
import {X9Bot} from './x9_bot.js';

export class StatsBot {
  private static NAME: string = 'stats';

  public respond(socket: SocketIOStatic, x9: X9Bot, conn: Object, msgs: {num: number}):void {
    let _users: string = `usuários: ${x9.usersOnline(conn)}`;
    let _amountMessages =  `número_msgs: ${x9.amountMsgs(msgs)}`;
    let _finalMsg = `${_users} | ${_amountMessages}`;

    let _msg = new MessageModel()
                .withUser(StatsBot.NAME)
                .withMessage(_finalMsg)
                .isBot(true);

    socket.emit(events.MESSAGE, _msg);
  }

  public wasMentioned(msg: string):boolean {
    return (msg.toLowerCase().indexOf("stat") > -1) || (msg.toLowerCase().indexOf("stats") > -1) || (msg.toLowerCase().indexOf("status") > -1);
  }

  static build():StatsBot {
    return new StatsBot();
  }
}
