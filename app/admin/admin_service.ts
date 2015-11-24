import {Observable} from 'angular2/angular2';

export class AdminService {
  static RELOAD: string = 'reload';
  static CLEAN: string = 'clean';
  static URL_CONNECTION: string = '';

  _socket: SocketIOStatic = io(AdminService.URL_CONNECTION);

  listenReload():Observable {
    return Observable.create((o) => {
      this._socket.on(AdminService.RELOAD, () => {
        o.next(null);
      });
    });
  }

  listenClean():Observable {
    return Observable.create((o) => {
      this._socket.on(AdminService.CLEAN, () => {
        o.next(null);
      });
    });
  }
}
