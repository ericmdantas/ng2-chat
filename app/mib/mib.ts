import {
  Component,
  OnInit
} from 'angular2/angular2';

import * as Rx from '@reactivex/rxjs/dist/cjs/Rx';

export class Mib {
  private _socket: SocketIOStatic = io('');
  private _doc: Document = document;
  public TIME_HIDES_BACKGROUND: number = 1000;

  flash() {
    let _mibFlash = this._doc.getElementById('chat');

    _mibFlash.style.background = 'url(app/mib/flash.gif)';
    _mibFlash.style.backgroundSize = 'cover';

    setTimeout(() => {
      _mibFlash.style.background = 'none';
    }, this.TIME_HIDES_BACKGROUND);
  }

  listen() {
    return Rx.Observable.create((o) => {
      this._socket.on('amnesia', () => {
            o.next(null);
      });
    });
  }
}
