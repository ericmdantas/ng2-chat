import {
  Observable
} from 'rxjs/Observable';

import {MessageModel} from 'app/chat/message/message_model.js';
import {URL_CONNECTION} from '../constants/url.js';

export class ChatService {
  static MESSAGE: string = 'msg';

  _socket: SocketIOStatic = io(URL_CONNECTION);

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
