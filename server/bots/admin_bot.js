import {events} from '../../common';

export class AdminBot {
  _commands = [
    '/reload',
    '/clean',
    '/clear',
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
    return this._commands.indexOf(msg) === 0;
  }

  isItClean(msg = '') {
    return (this._commands.indexOf(msg) === 1) || (this._commands.indexOf(msg) === 2);    
  }

  isItRoll(msg = '') {
    return msg.toLowerCase() === this._commands[3];
  }

  wasMentioned(msg = '') {
    return !!this._commands.filter((c) => c === msg).length;
  }

  static build() {
    return new AdminBot();
  }
}
