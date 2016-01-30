import {events} from '../../common';
import {MessageModel} from '../message_model';
import {X9Bot} from './x9_bot';

class Player {
    id = '';
    name = '';
    kills = 0;
    deaths = 0;
    level = 1;
    hp = FightBot.FULL_HP;

    constructor({id, name, kills, deaths, level, hp}) {
      this.id = id;
      this.name = String(name);
    }

    isAlive() {
      return this.hp > 0;
    }

    isDead() {
      return !this.isAlive();
    }

    addKills() {
      this.kills++;
      this.level++;
    }

    addWins() {
      this.level++;
    }

    dies() {
      if (this.level > 1) {
        this.level--;
      }

      this.deaths++;
    }

    resetHP() {
      this.hp = FightBot.FULL_HP;
    }
}

export class FightBot {
  static NAME = 'bruce.buffer';
  static MAX_ATTACK = 49;
  static FULL_HP = 100;
  _isFightGoingOn = false;

  players = new Map();

  init(user, connId) {
    this.players.set(user, new Player({id: connId, name: user}));
  }

  fight(io) {
    if (this._isFightGoingOn) {
      return;
    }

    this._isFightGoingOn = true;

    let _msg = new MessageModel().withUser(FightBot.NAME).isBot(true);

    let _msgList = [];

    _msgList.push(`IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIT'S`);
    _msgList.push(`TIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIME`);
    _msgList.push(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);

    this._fight(_msgList);
    this._announceWinner(io, _msg, _msgList);
    this._sendMessages(io, _msg, _msgList);
    this._resetHP();

    this._isFightGoingOn = false;
  }

  _fight(msgList) {
    while (!this._isOnlyOneAlive()) {
      for (let attacker of this.players.values()) {
        this.players.forEach((victim) => {
          if ((attacker.name !== victim.name) && (attacker.isAlive()) &&(victim.isAlive())) {
            let _atk = this._rollDice();
            let _def = this._rollDice();
            let _realResult = _atk - _def;

            let _result = _realResult >= 0 ? _realResult : 0;

            victim.hp -= _result;
            victim.hp = victim.hp >= 0 ? victim.hp : 0;

            if (_realResult <= 0) {
               msgList.push(`${attacker.name} misses ${victim.name} (${_atk} atk / ${_def} def) - ${victim.name} still has ${victim.hp} hp left`);
            }
            else {
              if (victim.isAlive()) {
                msgList.push(`${attacker.name} hits ${victim.name} by ${_result} (${_atk} atk / ${_def} def) - ${victim.name} has ${victim.hp} hp left`);
              }
              else {
                attacker.addKills();
                victim.dies();
                msgList.push(`${attacker.name} killed ${victim.name}! (${_atk} atk / ${_def} def)`);
              }
            }
          }
        });
      }
    }
  }

  _isOnlyOneAlive() {
    let _amountAlive = 0;

    this.players.forEach((p) => {
      _amountAlive += (p.isAlive()) ? 1 : 0;
    });

    return (_amountAlive === 1);
  }

  _announceWinner(io, msg, msgList) {
    this.players.forEach((p) => {
      if (p.isAlive()) {
        msgList.push(`${p.name.toUpperCase()} wins! (level ${p.level} / ${p.kills} kills / ${p.deaths} deaths)`);
      }
      else {
        msgList.push(`${p.name.toUpperCase()} died! (level ${p.level} / ${p.kills} kills / ${p.deaths} deaths)`);
      }
    });
  }

  _rollDice() {
    return ~~(Math.random() * FightBot.MAX_ATTACK);
  }

  _resetHP() {
    this.players.forEach((p) => {
      p.resetHP();
    });
  }

  _sendMessages(io, msg, msgList) {
    msgList.forEach((m) => {
      io.emit(events.MESSAGE, msg.withMessage(m));
    });
  }

  wasMentioned(msg = '') {
    return !!(~msg.indexOf("fight") || ~msg.indexOf("time!") || ~msg.toLowerCase().indexOf("it's time!"));
  }

  static build() {
    return new FightBot();
  }
}
