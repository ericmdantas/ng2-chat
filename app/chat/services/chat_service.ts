import {MessageModel} from 'app/chat/message/message_model.js';
import * as Rx from '@reactivex/rxjs/dist/cjs/Rx';

export class ChatService {
  static MESSAGE: string = 'msg';
  static URL_CONNECTION: string = '';

  _socket: SocketIOStatic = io(ChatService.URL_CONNECTION);

  listen():Rx.Observable<any> {
    return Rx.Observable.create((o) => {
      this._socket.on(ChatService.MESSAGE, (info) => {
        o.next(new MessageModel(info));
      });
    });
  }

  send(info: string, user: string):void {
    return this._socket.emit(ChatService.MESSAGE, {info, user});
  }

  sendEvent(ev:string, info:any):void {
    return this._socket.emit(ev, info);
  }
}
