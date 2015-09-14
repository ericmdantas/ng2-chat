/// <reference path="../../typings/tsd.d.ts" />

import {EventEmitter} from 'angular2/angular2';
import {IBus} from 'app/message_bus/interfaces.js';

export class UserStatusBus implements IBus {
  _ee: EventEmitter = new EventEmitter();

  listen():Rx.Observable<any> {
    return this._ee.toRx();
  }

  dispatch(info: any):void {
    this._ee.next(info);
  }
}
