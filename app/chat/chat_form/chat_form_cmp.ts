import {
  Component,
  OnInit,
  Inject,
  forwardRef
} from '@angular/core';

import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  REACTIVE_FORM_DIRECTIVES
} from '@angular/forms';

import {ChatService} from 'app/chat/services/chat_service';
import {UserStorageService} from 'app/user/user_storage_service';
import {MessageModel} from 'app/chat/message/message_model';
import {MentionService} from 'app/chat/chat_list/mention_service';
import {UserTypingDirective} from 'app/chat/chat_form/user_typing_directive';
import {ChatListModel} from 'app/chat/chat_list/chat_list_model';
import {PromptifyService} from 'app/chat/chat_promptify/promptify_service';
import {ArrowsDirective} from 'app/chat/chat_form/arrows_directive';
import {MessageStorageService} from 'app/chat/message/message_storage_service';

@Component({
  selector: 'chat-form-cmp',
  providers: [FormBuilder, forwardRef(() => ChatService), UserStorageService, PromptifyService, MessageStorageService],
  templateUrl: 'app/chat/chat_form/chat_form.html',
  styleUrls: ['app/chat/chat_form/chat_form.css'],
  directives: [UserTypingDirective, ArrowsDirective, REACTIVE_FORM_DIRECTIVES],
  host: {
    '(window:keydown)': 'keyUpHandler($event)'
  }
})
export class ChatFormCmp {
  chatForm: FormGroup;

  constructor(private _chatService: ChatService,
              fb: FormBuilder,
              private _promptifyService: PromptifyService,
              private _chatList: ChatListModel,
              private _messageStorageService: MessageStorageService,
              private _storage: UserStorageService) {

    this.chatForm = fb.group({
      "message": ["", Validators.required]
    });
  }

  private _clearForm() {
    (<FormControl>this.chatForm.controls["message"]).updateValue("");
  }

  public submitMessageHandler(msg: string) {
    let _username: string = this._storage.getUser().name;

    this._clearForm();

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

  public keyUpHandler(ev: KeyboardEvent) {
    if (ev.ctrlKey && ev.which === 76) {
      ev.preventDefault();
      this._chatList.removeAll();
    }
  }

  arrowUpHandler() {
    let _msg = this._messageStorageService.getPrevious();

    (<FormControl>this.chatForm.controls[_msg]).updateValue(_msg);
  }

  arrowDownHandler() {
    let _msg = this._messageStorageService.getNext();

    (<FormControl>this.chatForm.FormControls["message"]).updateValue(_msg);
  }

  private _mentionForm(n: string):void {
    let _mention = MentionService.MENTION + n;
    let _oldValue = (<FormControl>this.chatForm.FormControls["message"]).value;
    let _newValue = _oldValue.indexOf(_mention) === -1 ? `${_mention} ${_oldValue}` : _oldValue;

    (<FormControl>this.chatForm.FormControls["message"]).updateValue(_newValue);
  }

  public escHandler():void {
    this._clearForm();
  }
}
