/// <reference path="../../../typings/tsd.d.ts" />

import {EventEmitter} from 'angular2/angular2';
import {MessageModel} from 'app/chat/message/message_model.js';

export class ChatTypingService {
  static TYPING: string = 'typing';
  static URL_CONNECTION: string = '';

  _ee: EventEmitter = new EventEmitter();
  _socket: SocketIOStatic = io(ChatTypingService.URL_CONNECTION);

  listen():Rx.Observable<any> {
    this._socket.on(ChatTypingService.TYPING, (info) => {
      this._ee.next(new MessageModel(info));
    });

    return this._ee.toRx();
  }

  send(info:any):void {
    return this._socket.emit(ChatTypingService.TYPING, info);
  }
}
