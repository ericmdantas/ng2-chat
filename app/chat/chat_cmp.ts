/// <reference path="../,,/typings/tsd.d.ts" />

import {Component, View, ViewQuery, QueryList, OnInit} from 'angular2/angular2';
import {ChatListCmp} from 'app/chat/chat_list/chat_list_cmp.js';
import {ChatFormCmp} from 'app/chat/chat_form/chat_form_cmp.js';
import {ChatListModel} from 'app/chat/chat_list/chat_list_model.js';

@Component({
  selector: 'chat-cmp',
  viewBindings: [ChatListModel]
})
@View({
  template: `
    <div id="chat">
      <chat-list-cmp #clist (click-mention)="cform.mentionHandler($event)"></chat-list-cmp>
      <chat-form-cmp #cform></chat-form-cmp>
    </div>
  `,
  styleUrls: ['app/chat/chat.css'],
  directives: [ChatListCmp, ChatFormCmp]
})

export class ChatCmp implements OnInit {
    constructor(@ViewQuery(ChatListCmp) private _chatList: QueryList<ChatListCmp>) {

    }

    onInit() {
      console.log('chat-cmp init');
    }

    chatTrashedHandler(status:boolean):void {
      this._chatList.first.clearMessages();
    }
}
