/// <reference path="../../../typings/tsd.d.ts" />

import {Directive, ElementRef, Inject, OnInit} from 'angular2/angular2';
import {LogoutService} from 'app/chat/chat_logout/chat_logout_cmp.js';
import {UserStorageService} from 'app/user/user_storage_service.js';

export class PromptifyService {
  private _logoutService: LogoutService = new LogoutService(new UserStorageService());

  isCls(m: string):boolean {
    return (m === "cls");
  }

  isExit(m:string):boolean {
    return (m === "exit");
  }

  logout():void {
    this._logoutService.logout();
  }
}

@Directive({
  selector: '[promptify]'
})
export class PromptifyDirective implements OnInit {
  onInit() {
    console.log('promptify init');
  }
}
