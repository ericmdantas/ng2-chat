/// <reference path="../../node_modules/xtorage/dist/system/xtorage.d.ts" />

import {Xtorage} from 'node_modules/xtorage/dist/system/xtorage.js';
import {UserModel} from 'app/user/user_model.js';

export class StorageService {
  private static KEY_USER_ONLINE: string = 'user_online';
  private _xtorage: Xtorage = new Xtorage();

  isOnline():boolean {
    return !!this._xtorage.get(StorageService.KEY_USER_ONLINE);
  }

  getUser():UserModel {
    return new UserModel(this._xtorage.get(StorageService.KEY_USER_ONLINE));
  }

  saveUser(user: UserModel):void {
    this._xtorage.save(StorageService.KEY_USER_ONLINE, user);
  }

  removeUser():void {
    this._xtorage.removeAll();
  }
}
