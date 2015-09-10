/// <reference path="../../typings/tsd.d.ts" />

import {EventEmitter} from 'angular2/angular2';

export class StatsSocketListenerService {
  static MESSAGE_COUNT: string = 'msg_count';
  static PEOPLE_ONLINE: string = 'people_online';

  _msgCountEE: EventEmitter = new EventEmitter();
  _peopleOnlineEE: EventEmitter = new EventEmitter();
  _socket: SocketIOStatic = io('');

  listenMsgCount():Rx.Observable<any> {
    this._socket.on(StatsSocketListenerService.MESSAGE_COUNT, (num) => {
      this._msgCountEE.next(num);
    });

    return this._msgCountEE.toRx();
  }

  listenPeopleOnline():Rx.Observable<any> {
    this._socket.on(StatsSocketListenerService.PEOPLE_ONLINE, (num) => {
      this._peopleOnlineEE.next(num);
    });

    return this._peopleOnlineEE.toRx();
  }
}
