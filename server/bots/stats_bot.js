import {events} from '../../common';
import {MessageModel} from '../message_model';
import {X9Bot} from './x9_bot';

export class StatsBot {
  static NAME = 'stats';

  respond(socket, x9, conn, msgs) {
    let _users = `usuários: ${x9.usersOnline(conn)}`;
    let _amountMessages =  `número_msgs: ${x9.amountMsgs(msgs)}`;
    let _finalMsg = `${_users} | ${_amountMessages}`;

    let _msg = new MessageModel()
                .withUser(StatsBot.NAME)
                .withMessage(_finalMsg)
                .isBot(true);

    socket.emit(events.MESSAGE, _msg);
  }

  wasMentioned(msg) {
    return (msg.toLowerCase() === "stat") || (msg.toLowerCase() === "stats") || (msg.toLowerCase() === "status");
  }

  static build() {
    return new StatsBot();
  }
}
