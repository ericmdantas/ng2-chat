import {events} from '../../common';
import {MessageModel} from '../message_model';
import {X9Bot} from './x9_bot';

export class FightBot {
  static NAME = 'bruce.buffer';
  static MAX_ATTACK = 49;
  static FULL_HP = 100;
  _isFightGoingOn = false;

  fighters = new Map();

  init(user, connId) {
    this.fighters.set(user, {
      id: connId,
      name: user,
      kills: 0,
      deaths: 0,
      hp: FightBot.FULL_HP
    });
  }

  fight(io) {
    if (this._isFightGoingOn) {
      return;
    }

    this._isFightGoingOn = true;

    let _msg = new MessageModel()
                .withUser(FightBot.NAME)
                .isBot(true);

    _msg.withMessage(`IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIT'S`);
    io.emit(events.MESSAGE, _msg);

    _msg.withMessage(`TIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIME`);
    io.emit(events.MESSAGE, _msg);

    _msg.withMessage(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
    io.emit(events.MESSAGE, _msg);

    while (!this._isOnlyOneAlive()) {
      for (let name of this.fighters.keys()) {
        this.fighters.forEach((f) => {
          if ((f.name !== name) && (f.hp > 0)) {
            let _atk = this._rollDice();
            let _def = this._rollDice();
            let _realResult = _atk - _def;

            let _result = _realResult >= 0 ? _realResult : 0;

            f.hp -= _result;
            f.hp = f.hp >= 0 ? f.hp : 0;

            if (_realResult <= 0) {
              _msg.withMessage(`${name} misses ${f.name} (${_atk} atk / ${_def} def) - ${f.name} still has ${f.hp} hp left`);
            }
            else {
              _msg.withMessage(`${name} hits ${f.name} by ${_result} (${_atk} atk / ${_def} def) - ${f.name} has ${f.hp} hp left`);
            }

            io.emit(events.MESSAGE, _msg);
          }
        });
      }
    }

    this._announceWinner(io, _msg);
    this._resetHP();

    this._isFightGoingOn = false;
  }

  _isOnlyOneAlive() {
    let _amountAlive = 0;

    this.fighters.forEach((f) => {
      _amountAlive += (f.hp > 0) ? 1 : 0;
    });

    return _amountAlive === 1;
  }

  _announceWinner(io, msg) {
    this.fighters.forEach((f) => {
      if (f.hp > 0) {
        f.kills += 1;
        io.emit(events.MESSAGE, msg.withMessage(`${f.name.toUpperCase()} wins! (${f.kills} kills / ${f.deaths} deaths)`));
      }
      else {
        f.deaths += 1;
        io.emit(events.MESSAGE, msg.withMessage(`${f.name.toUpperCase()} died! (${f.kills} kills / ${f.deaths} deaths)`));
      }
    });
  }

  _rollDice() {
    return ~~(Math.random() * FightBot.MAX_ATTACK);
  }

  _resetHP() {
    this.fighters.forEach((f) => {
      f.hp = FightBot.FULL_HP;
    });
  }

  wasMentioned(msg = '') {
    return !!(~msg.indexOf("fight") || ~msg.indexOf("time") || ~msg.toLowerCase().indexOf("it's time!"));
  }

  static build() {
    return new FightBot();
  }
}
