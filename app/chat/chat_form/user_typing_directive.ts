/// <reference path="../../../typings/tsd.d.ts" />

import {Directive, Inject} from 'angular2/angular2';
import {ChatService} from 'app/chat/services/chat_service.js';
import {UserStorageService} from 'app/user/user_storage_service.js';

@Directive({
  selector: '[user-typing]',
  bindings: [ChatService, UserStorageService],
  host: {
    '(input)': 'inputHandler()'
  }
})
export class UserTypingDirective {
  constructor(@Inject(ChatService) private _chatService: ChatService,
              @Inject(UserStorageService) private _userStorageService: UserStorageService) {

  }

  inputHandler():void {
    //this._chatService.sendEvent('typing', {user: this._userStorageService.getUserName()});
  }
}
