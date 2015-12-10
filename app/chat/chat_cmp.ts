import {
  Component,
  OnInit
} from 'angular2/core';

import {ChatListCmp} from 'app/chat/chat_list/chat_list_cmp.js';
import {ChatFormCmp} from 'app/chat/chat_form/chat_form_cmp.js';
import {ChatListModel} from 'app/chat/chat_list/chat_list_model.js';

@Component({
  selector: 'chat-cmp',
  template: `
    <div id="chat">
      <chat-list-cmp #clist (click-mention)="cform.mentionHandler($event)"></chat-list-cmp>
      <chat-form-cmp #cform></chat-form-cmp>
    </div>
  `,
  styleUrls: ['app/chat/chat.css'],
  viewProviders: [ChatListModel],
  directives: [ChatListCmp, ChatFormCmp]
})
export class ChatCmp implements OnInit {
    ngOnInit() {
      console.log('chat-cmp init');
    }
}
