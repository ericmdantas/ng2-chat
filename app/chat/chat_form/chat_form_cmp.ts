/// <reference path="../../../typings/tsd.d.ts" />

import {
  Component,
  View,
  ViewEncapsulation,
  LifecycleEvent,
  FormBuilder,
  FORM_DIRECTIVES,
  Validators,
  ControlGroup
} from 'angular2/angular2';

import {Inject, forwardRef} from 'angular2/di';

import {ChatService} from 'app/chat/services/chat_service.js';

@Component({
  selector: 'chat-form-cmp',
  bindings: [FormBuilder ,forwardRef(() => ChatService)]
})
@View({
  templateUrl: 'app/chat/chat_form/chat_form.html',
  stylesUrl: ['app/chat/chat.css'],
  encapsulation: ViewEncapsulation.NATIVE,
  directives: [FORM_DIRECTIVES],
  styles: [`
    form {
      position: fixed;
      margin-top: 30px;
      bottom: 10px;
    }
  `]
})

export class ChatFormCmp {
  chatForm: ControlGroup;

  constructor(@Inject(forwardRef(() => ChatService)) private _chatService: ChatService, @Inject(FormBuilder) fb: FormBuilder) {
    this.chatForm = fb.group({
      "message": ["", Validators.required]
    });
  }

  sendMessage(message: string):void {
    this._chatService.send(message);
    this.chatForm.controls.message.updateValue("");
  }
}
