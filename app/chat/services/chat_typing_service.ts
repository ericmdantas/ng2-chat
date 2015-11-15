import {MessageModel} from 'app/chat/message/message_model.js';
import {Observable} from 'angular2/angular2';

export class ChatTypingService {
  static TYPING: string = 'typing';
  static URL_CONNECTION: string = '';

  _socket: SocketIOStatic = io(ChatTypingService.URL_CONNECTION);

  listen():Observable {
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
