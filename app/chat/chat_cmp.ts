/// <reference path="../,,/typings/tsd.d.ts" />

import {Component, View, LifecycleEvent, bootstrap} from 'angular2/angular2';
import {forwardRef} from 'angular2/di';
import {ChatListCmp} from 'app/chat/chat_list/chat_list_cmp.js';
import {ChatFormCmp} from 'app/chat/chat_form/chat_form_cmp.js';

@Component({
  selector: 'chat-cmp',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
    <chat-list-cmp></chat-list-cmp>
    <chat-form-cmp></chat-form-cmp>
  `,
  directives: [ChatListCmp, ChatFormCmp]
})

export class ChatCmp {
    onInit() {
      console.log('chat-cmp init');
    }
}
