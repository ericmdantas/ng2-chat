/// <reference path="../../../typings/tsd.d.ts" />

import {UserStorageService} from 'app/user/user_storage_service.js';

export class LogoutService {
  _w: Window = window;

  constructor(private _userStorageService: UserStorageService) {

  }

  logout() {
    this._userStorageService.removeUser();
    this._w.location.replace('/');
  }
}
