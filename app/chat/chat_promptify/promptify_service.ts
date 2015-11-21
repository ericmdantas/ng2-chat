import {
  Directive,
  ElementRef,
  Inject,
  OnInit
} from 'angular2/angular2';

import {LogoutService} from 'app/chat/chat_logout/chat_logout_service.js';
import {UserStorageService} from 'app/user/user_storage_service.js';

export class PromptifyService {
  private _logoutService: LogoutService = new LogoutService(new UserStorageService());

  isCls(m: string):boolean {
    return (m === "cls") || (m === "clear");
  }

  isExit(m:string):boolean {
    return (m === "exit") || (m === "leave") || (m === "logout");
  }

  logout():void {
    this._logoutService.logout();
  }
}
