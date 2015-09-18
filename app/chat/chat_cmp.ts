/// <reference path="../,,/typings/tsd.d.ts" />

import {Component, View, ViewQuery, QueryList, OnInit} from 'angular2/angular2';
import {ChatListCmp} from 'app/chat/chat_list/chat_list_cmp.js';
import {ChatFormCmp} from 'app/chat/chat_form/chat_form_cmp.js';
import {ChatTrashCmp} from 'app/chat/chat_trash/chat_trash_cmp.js';
import {ChatLogoutCmp} from 'app/chat/chat_logout/chat_logout_cmp.js';

@Component({
  selector: 'chat-cmp'
})
@View({
  template: `
    <chat-list-cmp #clist (click-mention)="cform.mentionHandler($event)"></chat-list-cmp>
    <chat-form-cmp #cform></chat-form-cmp>
    <chat-trash-cmp (chat-trashed)="chatTrashedHandler($event)"></chat-trash-cmp>
    <chat-logout-cmp></chat-logout-cmp>
  `,
  directives: [ChatListCmp, ChatFormCmp, ChatTrashCmp, ChatLogoutCmp]
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
