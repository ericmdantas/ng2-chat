/// <reference path="../../node_modules/xtorage/dist/system/xtorage.d.ts" />

import {Xtorage} from 'node_modules/xtorage/dist/system/xtorage.js';
import {UserModel} from 'app/user/user_model.js';

export class UserStorageService {
  private static KEY_USER_ONLINE: string = 'user_online';
  private _xtorage: Xtorage = new Xtorage();

  isOnline():boolean {
    return !!this._xtorage.get(UserStorageService.KEY_USER_ONLINE);
  }

  getUser():UserModel {
    let _user = new UserModel();
    _user.name = this._xtorage.get(UserStorageService.KEY_USER_ONLINE);

    return _user;
  }

  saveUser(user: UserModel):void {
    this._xtorage.save(UserStorageService.KEY_USER_ONLINE, user);
  }

  removeUser():void {
    this._xtorage.removeAll();
  }
}
