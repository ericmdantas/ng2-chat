import {
  Observable
} from 'rxjs/Observable';

import {MessageModel} from 'app/chat/message/message_model.js';
import {URL_CONNECTION} from '../constants/url.js';

export class ChatTypingService {
  static TYPING: string = 'typing';
  _socket: SocketIOStatic = io(URL_CONNECTION);

  listen():Observable<MessageModel> {
    return Observable.create((o) => {
      this._socket.on(ChatTypingService.TYPING, (info) => {
        o.next(new MessageModel(info));
      });
    })
  }

  send(info:any):void {
    return this._socket.emit(ChatTypingService.TYPING, info);
  }
}
