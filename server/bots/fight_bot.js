import {events} from '../../common';
import {MessageModel} from '../message_model';
import {X9Bot} from './x9_bot';

export class FightBot {
  static NAME = 'bruce.buffer';
  static MAX_ATTACK = 20;
  static MIN_ATTACK = 0;

  fighters = new Map();

  init(user, conn) {
    this.fighters.set(user, {
      id: conn.id,
      name: f,
      kills: 0,
      deaths: 0,
      hp: 100
    });
  }

  fight() {
    for (let name of this.fighters.keys()) {
      this.fighters.forEach((f) => {
        
      });
    }
  }

  _rollDice() {

  }

  wasMentioned(msg) {
    return ~msg.indexOf("fight");
  }

  static build() {
    return new FightBot();
  }
}
