import {
  UserStorageService
} from 'app/user/user_storage_service';

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
