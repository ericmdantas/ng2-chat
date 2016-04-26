import {
  Directive,
  Inject,
  forwardRef,
  ElementRef
} from 'angular2/core';

import {ChatTypingService} from 'app/chat/services/chat_typing_service.js';
import {UserStorageService} from 'app/user/user_storage_service.js';

@Directive({
  selector: '[userTyping]',
  providers: [ChatTypingService, UserStorageService],
  host: {
    '(input)': 'inputHandler()'
  }
})
export class UserTypingDirective {
  constructor(@Inject(ChatTypingService) private _chatTypingService: ChatTypingService,
              @Inject(UserStorageService) private _userStorageService: UserStorageService,
              @Inject(ElementRef) private _el: ElementRef) {

  }

  inputHandler():void {
    this._chatTypingService.send({user: this._userStorageService.getUserName(), message: this._el.nativeElement.value});
  }
}
