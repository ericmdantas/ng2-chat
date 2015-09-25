/// <reference path="../../../typings/tsd.d.ts" />

import {Directive, Inject, forwardRef} from 'angular2/angular2';
import {ChatTypingService} from 'app/chat/services/chat_typing_service.js';
import {UserStorageService} from 'app/user/user_storage_service.js';

@Directive({
  selector: '[user-typing]',
  bindings: [ChatTypingService, UserStorageService],
  host: {
    '(input)': 'inputHandler()'
  }
})
export class UserTypingDirective {
  constructor(@Inject(ChatTypingService) private _chatTypingService: ChatTypingService,
              @Inject(UserStorageService) private _userStorageService: UserStorageService) {

  }

  inputHandler():void {
    this._chatTypingService.send({user: this._userStorageService.getUserName()});
  }
}
