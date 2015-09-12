/// <reference path="../../node_modules/xtorage/dist/system/xtorage.d.ts" />

import {Xtorage} from 'xtorage.js';
import {UserModel} from 'app/user/user_model.js';

export class StorageService {
  public static KEY_LOGGED_USER: string = 'log_user';
  private _xtorage: Xtorage = new Xtorage();

  getUser():UserModel {
    return new UserModel(this._xtorage.get(StorageService.KEY_LOGGED_USER));
  }

  saveUser(user: UserModel):void {
    this._xtorage.save(StorageService.KEY_LOGGED_USER, user);
  }
}
