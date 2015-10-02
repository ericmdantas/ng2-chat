/// <reference path="../../../typings/tsd.d.ts" />

import {
  Component,
  View,
  ViewEncapsulation,
  OnInit,
  FormBuilder,
  FORM_DIRECTIVES,
  Validators,
  bind,
  ControlGroup
} from 'angular2/angular2';

import {Inject, forwardRef} from 'angular2/di';

import {ChatService} from 'app/chat/services/chat_service.js';
import {UserStorageService} from 'app/user/user_storage_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';
import {MentionService} from 'app/chat/chat_list/mention_service.js';
import {UserTypingDirective} from 'app/chat/chat_form/user_typing_directive.js';
import {ChatListModel} from 'app/chat/chat_list/chat_list_model.js';
import {PromptifyService} from 'app/chat/chat_promptify/promptify_service.js';

@Component({
  selector: 'chat-form-cmp',
  bindings: [FormBuilder, forwardRef(() => ChatService), UserStorageService, PromptifyService]
})
@View({
  templateUrl: 'app/chat/chat_form/chat_form.html',
  styleUrls: ['app/chat/chat_form/chat_form.css'],
  encapsulation: ViewEncapsulation.Native,
  directives: [FORM_DIRECTIVES, UserTypingDirective]
})
export class ChatFormCmp {
  chatForm: ControlGroup;

  constructor(@Inject(forwardRef(() => ChatService)) private _chatService: ChatService,
              @Inject(FormBuilder) fb: FormBuilder,
              @Inject(PromptifyService) private _promptifyService: PromptifyService,
              @Inject(ChatListModel) private _chatList: ChatListModel,
              @Inject(UserStorageService) private _storage: UserStorageService) {

    this.chatForm = fb.group({
      "message": ["", Validators.required]
    });
  }

  sendMessage(message: string):void {
    let _username: string = this._storage.getUser().name;

    this.chatForm.controls.message.updateValue("");

    if (this._promptifyService.isCls(message)) {
      this._chatList.removeAll();
      return;
    }

    if (this._promptifyService.isExit(message)) {
      this._promptifyService.logout();
      return;
    }

    this._chatService.send(message, _username);
  }

  mentionHandler(m: MessageModel):void {
    let _bot = m.bot;
    let _you = this._storage.getUserName() === m.user;

    if (!_bot && !_you) {
      this._mentionForm(m.user);
    }
  }

  private _mentionForm(n: string):void {
    let _mention = MentionService.MENTION + n;
    let _oldValue = this.chatForm.controls.message.value;
    let _newValue = _oldValue.indexOf(_mention) === -1 ? `${_mention} ${_oldValue}` : _oldValue;

    this.chatForm.controls.message.updateValue(_newValue);
  }

  escHandler():void {
    this.chatForm.controls.message.updateValue("");
  }
}
