import {
  Observable
} from 'rxjs/Observable';

import {URL_CONNECTION} from '../chat/constants/url.js';

export class AdminService {
  static RELOAD: string = 'reload';
  static CLEAN: string = 'clean';

  _socket: SocketIOStatic = io(URL_CONNECTION);

  listenReload():Observable<any> {
    return new Observable((o) => {
      this._socket.on(AdminService.RELOAD, () => {
        o.next(null);
      });
    });
  }

  listenClean():Observable<any> {
    return new Observable((o) => {
      this._socket.on(AdminService.CLEAN, () => {
        o.next(null);
      });
    });
  }
}
