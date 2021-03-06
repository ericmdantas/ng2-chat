import {
  Component,
  OnInit
} from '@angular/core';

import {ChatListCmp} from 'app/chat/chat_list/chat_list_cmp';
import {ChatFormCmp} from 'app/chat/chat_form/chat_form_cmp';
import {ChatListModel} from 'app/chat/chat_list/chat_list_model';

@Component({
  selector: 'chat-cmp',
  template: `
    <div id="chat">
      <chat-list-cmp #clist (clickMention)="cform.mentionHandler($event)"></chat-list-cmp>
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
