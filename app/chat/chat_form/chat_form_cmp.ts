import {
  Component,
  OnInit,
  Inject,
  forwardRef
} from 'angular2/core';

import {
  FormBuilder,
  Validators,
  ControlGroup,
  Control
} from 'angular2/common';

import {ChatService} from 'app/chat/services/chat_service.js';
import {UserStorageService} from 'app/user/user_storage_service.js';
import {MessageModel} from 'app/chat/message/message_model.js';
import {MentionService} from 'app/chat/chat_list/mention_service.js';
import {UserTypingDirective} from 'app/chat/chat_form/user_typing_directive.js';
import {ChatListModel} from 'app/chat/chat_list/chat_list_model.js';
import {PromptifyService} from 'app/chat/chat_promptify/promptify_service.js';
import {ArrowsDirective} from 'app/chat/chat_form/arrows_directive.js';
import {MessageStorageService} from 'app/chat/message/message_storage_service.js';

@Component({
  selector: 'chat-form-cmp',
  providers: [FormBuilder, forwardRef(() => ChatService), UserStorageService, PromptifyService, MessageStorageService],
  templateUrl: 'app/chat/chat_form/chat_form.html',
  styleUrls: ['app/chat/chat_form/chat_form.css'],
  directives: [UserTypingDirective, ArrowsDirective]
})
export class ChatFormCmp {
  chatForm: ControlGroup;

  constructor(@Inject(forwardRef(() => ChatService)) private _chatService: ChatService,
              @Inject(FormBuilder) fb: FormBuilder,
              @Inject(PromptifyService) private _promptifyService: PromptifyService,
              @Inject(ChatListModel) private _chatList: ChatListModel,
              @Inject(MessageStorageService) private _messageStorageService: MessageStorageService,
              @Inject(UserStorageService) private _storage: UserStorageService) {

    this.chatForm = fb.group({
      "message": ["", Validators.required]
    });
  }

  public submitMessageHandler(msg: string) {
    let _username: string = this._storage.getUser().name;

    (<Control>this.chatForm.controls["message"]).updateValue("");

    if (this._promptifyService.isCls(msg)) {
      this._chatList.removeAll();
      return;
    }

    if (this._promptifyService.isExit(msg)) {
      this._promptifyService.logout();
      return;
    }

    this._sendMessage(msg, _username);
    this._messageStorageService.save(msg);
  }

  private _sendMessage(message: string, username: string):void {
    this._chatService.send(message, username);
  }

  public mentionHandler(m: MessageModel):void {
    let _bot = m.bot;
    let _you = this._storage.getUserName() === m.user;

    if (!_bot && !_you) {
      this._mentionForm(m.user);
    }
  }

  arrowUpHandler() {
    let _msg = this._messageStorageService.getPrevious();

    (<Control>this.chatForm.controls[_msg]).updateValue(_msg);
  }

  arrowDownHandler() {
    let _msg = this._messageStorageService.getNext();

    (<Control>this.chatForm.controls["message"]).updateValue(_msg)
  }

  private _mentionForm(n: string):void {
    let _mention = MentionService.MENTION + n;
    let _oldValue = (<Control>this.chatForm.controls["message"]).value;
    let _newValue = _oldValue.indexOf(_mention) === -1 ? `${_mention} ${_oldValue}` : _oldValue;

    (<Control>this.chatForm.controls["message"]).updateValue(_newValue);
  }

  public escHandler():void {
    (<Control>this.chatForm.controls["message"]).updateValue("");
  }
}
