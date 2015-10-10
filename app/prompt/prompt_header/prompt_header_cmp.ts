/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, OnInit} from 'angular2/angular2';
import {LogoutService} from 'app/chat/chat_logout/chat_logout_service.js';

@Component({
  selector: 'prompt-header-cmp',
  viewBindings: [LogoutService],
  templateUrl: 'app/prompt/prompt_header/prompt_header.html',
  styleUrls: ['app/prompt/prompt_header/prompt_header.css']
})
export class PromptHeaderCmp implements OnInit {
  constructor(private _logoutService: LogoutService) {

  }

  onInit() {
    console.log('prompt-header-cmp init');
  }

  logoutHandler() {
    this._logoutService.logout();
  }
}
