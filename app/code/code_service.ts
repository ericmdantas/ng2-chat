import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import {
  URL_CONNECTION
} from 'app/chat/constants/url';

@Injectable()
export class ChatCodeService {
  private _socket = io(URL_CONNECTION);

  listen():Observable<any> {
    return new Observable((o) => {
      this._socket.on('code', (info:any) => {
        o.next(info);
      })
    });
  }

  send(info:any) {
    this._socket.emit('code', info);
  }
}
