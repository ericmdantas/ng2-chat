/// <reference path="../../../typings/tsd.d.ts" />

import {
  Component,
  View,
  ViewEncapsulation,
  OnInit,
  FormBuilder,
  FORM_DIRECTIVES,
  Validators,
  ControlGroup
} from 'angular2/angular2';

import {Inject, forwardRef} from 'angular2/di';

import {ChatService} from 'app/chat/services/chat_service.js';
import {StorageService} from 'app/storage/storage_service.js';

@Component({
  selector: 'chat-form-cmp',
  bindings: [FormBuilder, forwardRef(() => ChatService), StorageService]
})
@View({
  templateUrl: 'app/chat/chat_form/chat_form.html',
  styleUrls: ['app/chat/chat_form/chat_form.css'],
  encapsulation: ViewEncapsulation.Native,
  directives: [FORM_DIRECTIVES],
})

export class ChatFormCmp {
  chatForm: ControlGroup;

  constructor(@Inject(forwardRef(() => ChatService)) private _chatService: ChatService,
              @Inject(FormBuilder) fb: FormBuilder,
              @Inject(StorageService) private _storage: StorageService) {

    this.chatForm = fb.group({
      "message": ["", Validators.required]
    });
  }

  sendMessage(message: string):void {
    let _username: string = this._storage.getUser().name;

    this._chatService.send(message, _username);
    this.chatForm.controls.message.updateValue("");
  }
}
