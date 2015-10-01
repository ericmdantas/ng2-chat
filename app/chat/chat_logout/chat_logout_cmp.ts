/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, Inject, bind, OnInit} from 'angular2/angular2';
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

@Component({
  selector: 'chat-logout-cmp',
  bindings: [bind(LogoutService).toFactory(() => new LogoutService(new UserStorageService()))]
})
@View({
  templateUrl: 'app/chat/chat_logout/chat_logout.html',
  styleUrls: ['app/chat/chat_logout/chat_logout.css']
})
export class ChatLogoutCmp implements OnInit {

  constructor(@Inject(LogoutService) private _logoutService: LogoutService) {

  }

  onInit() {
    console.log('chat-logout-cmp init');
  }

  logoutHandler():void {
    this._logoutService.logout();
  }
}
