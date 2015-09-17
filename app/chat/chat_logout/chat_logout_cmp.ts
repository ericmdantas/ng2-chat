/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, Inject, OnInit} from 'angular2/angular2';
import {UserStorageService} from 'app/user_storage/user_storage_service.js';

@Component({
  selector: 'chat-logout-cmp',
  bindings: [UserStorageService]
})
@View({
  templateUrl: 'app/chat/chat_logout/chat_logout.html',
  styleUrls: ['app/chat/chat_logout/chat_logout.css']
})
export class ChatLogoutCmp implements OnInit {
  _w: Window = window;

  constructor(@Inject(UserStorageService) private _userStorageService: UserStorageService) {

  }

  onInit() {
    console.log('chat-logout-cmp init');
  }

  logoutHandler():void {
    this._userStorageService.removeUser();
    this._w.location.replace('/');
  }
}
