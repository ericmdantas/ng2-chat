import {events} from '../../common';

export class AdminBot {
  _commands = [
    '/reload',
    '/clean',
    '/roll'
  ];

  doReload(io) {
    io.emit(events.RELOAD);
  }

  doClean(io) {
    io.emit(events.CLEAN);
  }

  doRoll(io) {
    io.emit(events.ROLL);
  }

  isItReload(msg = '') {
    return msg.toLowerCase() === this._commands[0];
  }

  isItClean(msg = '') {
    return msg.toLowerCase() === this._commands[1];
  }

  isItRoll(msg = '') {
    return msg.toLowerCase() === this._commands[2];
  }

  wasMentioned(msg = '') {
    return !!this._commands.filter((c) => c === msg).length;
  }

  static build() {
    return new AdminBot();
  }
}
