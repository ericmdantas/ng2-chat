/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, Inject, OnInit} from 'angular2/angular2';
import {StorageService} from 'app/storage/storage_service.js';

@Component({
  selector: 'chat-logout-cmp',
  bindings: [StorageService]
})
@View({
  templateUrl: 'app/chat/chat_logout/chat_logout.html',
  styleUrls: ['app/chat/chat_logout/chat_logout.css']
})
export class ChatLogoutCmp implements OnInit {
  _w: Window = window;

  constructor(@Inject(StorageService) private _storageService: StorageService) {

  }

  onInit() {
    console.log('chat-logout-cmp init');
  }

  logoutHandler():void {
    this._storageService.removeUser();
    this._w.location.replace('/');
  }
}
