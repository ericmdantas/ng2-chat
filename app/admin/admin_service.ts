import {
  Observable
} from 'rxjs/Observable';

import {URL_CONNECTION} from '../chat/constants/url';

export class AdminService {
  static RELOAD: string = 'reload';
  static CLEAN: string = 'clean';
  static ROLL: string = 'roll';
  static URL_CONNECTION: string = '';

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

  listenRoll():Observable<null> {
    return new Observable((o) => {
      this._socket.on(AdminService.ROLL, () => {
        o.next(null);
      });
    });
  }
}
