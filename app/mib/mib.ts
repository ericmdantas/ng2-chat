import {
  Component,
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {URL_CONNECTION} from '../chat/constants/url';

@Injectable()
export class Mib {
  private _socket: SocketIOStatic = io(URL_CONNECTION);
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

  listen():Observable<any> {
    return new Observable((o) => {
      this._socket.on('amnesia', () => {
            o.next(null);
      });
    });
  }
}
