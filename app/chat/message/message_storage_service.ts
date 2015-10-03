/// <reference path="../../node_modules/xtorage/dist/system/xtorage.d.ts" />

import {Xtorage} from 'node_modules/xtorage/dist/system/xtorage.js';

export class MessageStorageService {
  private _xtorage: Xtorage = new Xtorage();
  private static KEY: string = 'm';

  save(message: string) {
    this._xtorage.save(MessageStorageService.KEY, message);
  }

  get():string[] {
    return this._xtorage.get(MessageStorageService.KEY);
  }
}
