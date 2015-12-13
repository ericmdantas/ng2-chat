import {
  Observable
} from 'rxjs/Observable';

import {MessageModel} from 'app/chat/message/message_model.js';

export class ChatService {
  static MESSAGE: string = 'msg';
  static URL_CONNECTION: string = '';

  _socket: SocketIOStatic = io(ChatService.URL_CONNECTION);

  listen():Observable<any> {
    return new Observable((o) => {
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
