/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, EventEmitter, OnInit, CORE_DIRECTIVES, Inject, ViewQuery, QueryList} from 'angular2/angular2';
import {ChatService} from 'app/chat/services/chat_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';
import {ChatBlinkDirective} from 'app/chat/chat_list/chat_blink_directive.js';
import {ChatScrollBottomDirective} from 'app/chat/chat_list/chat_scroll_bottom_directive.js';
import {NotificationNewMessagesService} from 'app/notifications/notifications_new_messages_service.js';
import {UserOnlineMessageService} from 'app/chat/chat_list/chat_user_online_message_service.js';
import {MentionService} from 'app/chat/chat_list/mention_service.js';

@Component({
  selector: 'chat-list-cmp',
  bindings: [ChatService, UserOnlineMessageService, NotificationNewMessagesService, MentionService],
  events: ['clickMention']
})
@View({
  templateUrl: 'app/chat/chat_list/chat_list.html',
  styleUrls: ['app/chat/chat_list/chat_list.css'],
  directives: [CORE_DIRECTIVES, ChatBlinkDirective, ChatScrollBottomDirective]
})
export class ChatListCmp implements OnInit {
  public messages: MessageModel[] = [];
  clickMention: EventEmitter = new EventEmitter();

  constructor(@Inject(ChatService) private _chatService: ChatService,
              @Inject(UserOnlineMessageService) private _userOnlineMessageService: UserOnlineMessageService,
              @Inject(MentionService) private _mentionService: MentionService,
              @Inject(NotificationNewMessagesService) private _notificationNewMessageService: NotificationNewMessagesService) {

  }

  onInit() {
    this._chatService
        .listen()
        .subscribe((message) => {
            this._userOnlineMessageService.markMessage(message);
            this._notificationNewMessageService.toggleTitle(message);
            this._mentionService.makeMention(message);

            this.messages.push(message);
        });
  }

  mentionClickHandler(m: MessageModel):void {
    this.clickMention.next(m);
  }

  clearMessages():void {
    this.messages.length = 0;
  }
}
