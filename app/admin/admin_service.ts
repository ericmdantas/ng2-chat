import {
  Observable
} from 'rxjs/Observable';

export class AdminService {
  static RELOAD: string = 'reload';
  static CLEAN: string = 'clean';
  static ROLL: string = 'roll';
  static URL_CONNECTION: string = '';

  _socket: SocketIOStatic = io(AdminService.URL_CONNECTION);

  listenReload():Observable {
    return new Observable((o) => {
      this._socket.on(AdminService.RELOAD, () => {
        o.next(null);
      });
    });
  }

  listenClean():Observable {
    return new Observable((o) => {
      this._socket.on(AdminService.CLEAN, () => {
        o.next(null);
      });
    });
  }

  listenRoll():Observable {
    return new Observable((o) => {
      this._socket.on(AdminService.ROLL, () => {
        o.next(null);
      });
    });
  }
}
