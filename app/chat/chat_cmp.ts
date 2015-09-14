/// <reference path="../,,/typings/tsd.d.ts" />

import {Component, View, ViewQuery, QueryList, OnInit} from 'angular2/angular2';
import {ChatListCmp} from 'app/chat/chat_list/chat_list_cmp.js';
import {ChatFormCmp} from 'app/chat/chat_form/chat_form_cmp.js';
import {ChatTrashCmp} from 'app/chat/chat_trash/chat_trash_cmp.js';

@Component({
  selector: 'chat-cmp'
})
@View({
  template: `
    <chat-list-cmp></chat-list-cmp>
    <chat-form-cmp></chat-form-cmp>
    <chat-trash-cmp (chat-trashed)="chatTrashedHandler($event)"></chat-trash-cmp>
  `,
  directives: [ChatListCmp, ChatFormCmp, ChatTrashCmp]
})

export class ChatCmp implements OnInit {
    constructor(@ViewQuery(ChatListCmp) private _chatList: QueryList<ChatListCmp>) {

    }

    onInit() {
      console.log('chat-cmp init');
    }

    chatTrashedHandler(status:boolen):void {
      this._chatList.first.messages.length = 0;
    }
}
