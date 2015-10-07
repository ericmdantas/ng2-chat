/// <reference path="../../node_modules/xtorage/dist/system/xtorage.d.ts" />

import {Xtorage} from 'node_modules/xtorage/dist/system/xtorage.js';

export class MessageStorageService {
  private _xtorage: Xtorage = new Xtorage();
  private static KEY: string = 'm';
  private _position: number = 0;

  save(message: string) {
    this._xtorage.saveInLastPosition(MessageStorageService.KEY, message);
  }

  getNext():string {
    this._position--;
    return this._xtorage.get(MessageStorageService.KEY)[this._position];
  }

  getPrevious():string {
    this._position++;
    return this._xtorage.get(MessageStorageService.KEY)[this._position];
  }
}
