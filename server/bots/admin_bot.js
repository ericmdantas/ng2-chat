import {events} from '../../common';

export class AdminBot {
  _commands = [
    '/reload',
    '/clean'
  ];

  doReload(io) {
    io.emit(events.RELOAD);
  }

  doClean(io) {
    io.emit(events.CLEAN);
  }

  isItReload(msg = '') {
    return msg.toLowerCase() === this._commands[0];
  }

  isItClean(msg = '') {
    return msg.toLowerCase() === this._commands[1];
  }

  wasMentioned(msg = '') {
    return !!this._commands.filter((c) => c === msg).length;
  }

  static build() {
    return new AdminBot();
  }
}
