/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, OnInit, CORE_DIRECTIVES, Inject} from 'angular2/angular2';
import {ChatService} from 'app/chat/services/chat_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';
import {ChatBlinkDirective} from 'app/chat/chat_list/chat_blink_directive.js';
import {ChatScrollBottomDirective} from 'app/chat/chat_list/chat_scroll_bottom_directive.js';

@Component({
  selector: 'chat-list-cmp',
  bindings: [ChatService]
})
@View({
  templateUrl: 'app/chat/chat_list/chat_list.html',
  styleUrls: ['app/chat/chat_list/chat_list.css'],
  directives: [CORE_DIRECTIVES, ChatBlinkDirective, ChatScrollBottomDirective]
})
export class ChatListCmp implements OnInit {
  public messages: MessageModel[] = [];

  constructor(@Inject(ChatService) private _chatService: ChatService) {

  }

  onInit() {
    this._chatService
        .listen()
        .subscribe((message) => {
          this.messages.push(message);
        });
  }
}
