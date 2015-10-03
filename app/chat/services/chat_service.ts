/// <reference path="../../../typings/tsd.d.ts" />

import {EventEmitter} from 'angular2/angular2';
import {MessageModel} from 'app/chat/message/message_model.js';

export class ChatService {
  static MESSAGE: string = 'msg';
  static URL_CONNECTION: string = '';

  _ee: EventEmitter = new EventEmitter();
  _socket: SocketIOStatic = io(ChatService.URL_CONNECTION);

  listen():Rx.Observable<any> {
    this._socket.on(ChatService.MESSAGE, (info) => {
      this._ee.next(new MessageModel(info));
    });

    return this._ee.toRx();
  }

  listenToTyping():Rx.Observable<any> {
    this._socket.on('typing', (info) => {
      this._ee.next(new MessageModel(info));
    });

    return this._ee.toRx();
  }

  send(info: string, user: string):void {
    return this._socket.emit(ChatService.MESSAGE, {info, user});
  }

  sendEvent(ev:string, info:any):void {
    return this._socket.emit(ev, info);
  }
}
