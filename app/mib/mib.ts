/// <reference path="../../typings/tsd.d.ts" />

import {EventEmitter} from 'angular2/angular2';

export class Mib {
  _ee: EventEmitter = new EventEmitter();
  _socket: SocketIOStatic = io('');

  listen() {
    this._socket.on('amnesia', () => {
      this._ee.next({});
    })

    return this._ee.toRx();
  }
}
