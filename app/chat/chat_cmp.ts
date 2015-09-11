/// <reference path="../,,/typings/tsd.d.ts" />

import {Component, View, OnInit} from 'angular2/angular2';
import {ChatListCmp} from 'app/chat/chat_list/chat_list_cmp.js';
import {ChatFormCmp} from 'app/chat/chat_form/chat_form_cmp.js';

@Component({
  selector: 'chat-cmp'
})
@View({
  template: `
    <chat-list-cmp></chat-list-cmp>
    <chat-form-cmp></chat-form-cmp>
  `,
  directives: [ChatListCmp, ChatFormCmp]
})

export class ChatCmp implements OnInit {
    onInit() {
      console.log('chat-cmp init');
    }
}
