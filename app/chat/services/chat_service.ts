/// <reference path="../../../typings/tsd.d.ts" />

import {EventEmitter} from 'angular2/angular2';

export class ChatService {
  static MESSAGE: string = 'msg';
  static URL_CONNECTION: string = '';

  _ee: EventEmitter = new EventEmitter();
  _socket: SocketIOStatic = io(ChatService.URL_CONNECTION);

  listen():Rx.Observable<any> {
    this._socket.on(ChatService.MESSAGE, (info) => {
      this._ee.next(info);
    });

    return this._ee.toRx();
  }

  send(msg: any):void {
    return this._socket.emit(ChatService.MESSAGE, msg);
  }
}
