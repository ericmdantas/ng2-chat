import {MessageModel} from 'app/chat/message/message_model.js';
import * as Rx from '@reactivex/rxjs/dist/cjs/Rx'

export class ChatTypingService {
  static TYPING: string = 'typing';
  static URL_CONNECTION: string = '';

  _socket: SocketIOStatic = io(ChatTypingService.URL_CONNECTION);

  listen():Rx.Observable<any> {
    return Rx.Observable.create((o) => {
      this._socket.on(ChatTypingService.TYPING, (info) => {
        this._ee.next(new MessageModel(info));
      });
    })
  }

  send(info:any):void {
    return this._socket.emit(ChatTypingService.TYPING, info);
  }
}
