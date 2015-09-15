/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, OnInit, CORE_DIRECTIVES, Inject, ViewQuery, QueryList} from 'angular2/angular2';
import {ChatService} from 'app/chat/services/chat_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';
import {ChatBlinkDirective} from 'app/chat/chat_list/chat_blink_directive.js';
import {ChatScrollBottomDirective} from 'app/chat/chat_list/chat_scroll_bottom_directive.js';
import {NotificationNewMessagesDirective} from 'app/notifications/notifications_new_messages_directive.js';

@Component({
  selector: 'chat-list-cmp',
  bindings: [ChatService]
})
@View({
  templateUrl: 'app/chat/chat_list/chat_list.html',
  styleUrls: ['app/chat/chat_list/chat_list.css'],
  directives: [CORE_DIRECTIVES, ChatBlinkDirective, ChatScrollBottomDirective, NotificationNewMessagesDirective]
})
export class ChatListCmp implements OnInit {
  public messages: MessageModel[] = [];

  constructor(@Inject(ChatService) private _chatService: ChatService,
              @ViewQuery(NotificationNewMessagesDirective) private _notifications: QueryList<NotificationNewMessagesDirective>) {

  }

  onInit() {
    this._chatService
        .listen()
        .subscribe((message) => {
          this.messages.push(message);
          this._notifications.first.notifyNewMessage();
        });
  }

  clearMessages():void {
    this.messages.length = 0;
  }
}
