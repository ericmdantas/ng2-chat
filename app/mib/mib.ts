/// <reference path="../../typings/tsd.d.ts" />

import {
  Component,
  OnInit,
  EventEmitter
} from 'angular2/angular2';

export class Mib {
  private _ee: EventEmitter = new EventEmitter();;
  private _socket: SocketIOStatic = io('');
  private _doc: Document = document;
  public TIME_HIDES_BACKGROUND: number = 1000;

  flash() {
    let _mibFlash = this._doc.getElementById('chat');

    _mibFlash.style.background = 'url(app/mib/flash.gif)';
    _mibFlash.style.backgroundSize = 'cover';

    setTimeout(() => {
      if (this._doc.hasFocus()) {
        _mibFlash.style.background = 'none';
      }
    }, this.TIME_HIDES_BACKGROUND);
  }

  listen() {
    this._socket.on('amnesia', () => {
      this._ee.next({});
    })

    return this._ee.toRx();
  }
}
