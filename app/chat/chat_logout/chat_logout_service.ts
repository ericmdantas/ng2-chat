import {
  UserStorageService
} from 'app/user/user_storage_service';

import {Injectable} from '@angular/core';

@Injectable()
export class LogoutService {
  _w: Window = window;
  private _userStorageService: UserStorageService = new UserStorageService();

  constructor() {

  }

  logout() {
    this._userStorageService.removeUser();
    this._w.location.replace('/');
  }
}
