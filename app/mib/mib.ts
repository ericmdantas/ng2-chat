import {
  Component,
  Observable
} from 'angular2/core';

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

  listen():Observable {
    return new Observable((o) => {
      this._socket.on('amnesia', () => {
            o.next(null);
      });
    });
  }
}
