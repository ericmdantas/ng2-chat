/// <reference path="../../../typings/tsd.d.ts" />

import * as _ from 'lodash.js';
import {Component, View, EventEmitter, OnInit, CORE_DIRECTIVES, Inject, ViewQuery, QueryList, forwardRef} from 'angular2/angular2';
import {ChatService} from 'app/chat/services/chat_service.js';
import {ChatTypingService} from 'app/chat/services/chat_typing_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';
import {NotificationNewMessagesService} from 'app/notifications/notifications_new_messages_service.js';
import {UserOnlineMessageService} from 'app/chat/chat_list/chat_user_online_message_service.js';
import {MentionService} from 'app/chat/chat_list/mention_service.js';
import {DeleteMessageService} from 'app/chat/chat_list/delete_message_service.js';
import {ChatListModel} from 'app/chat/chat_list/chat_list_model.js';

@Component({
  selector: 'chat-list-cmp',
  bindings: [ChatService, UserOnlineMessageService, NotificationNewMessagesService,
             ChatTypingService, MentionService, DeleteMessageService],
  events: ['clickMention']
})
@View({
  templateUrl: 'app/chat/chat_list/chat_list.html',
  styleUrls: ['app/chat/chat_list/chat_list.css'],
  directives: [CORE_DIRECTIVES]
})
export class ChatListCmp implements OnInit {
  public tMsg: MessageModel = new MessageModel();
  clickMention: EventEmitter = new EventEmitter();

  constructor(@Inject(ChatService) private _chatService: ChatService,
              @Inject(ChatTypingService) private _chatTypingService: ChatTypingService,
              @Inject(UserOnlineMessageService) private _userOnlineMessageService: UserOnlineMessageService,
              @Inject(MentionService) private _mentionService: MentionService,
              @Inject(DeleteMessageService) private _deleteMessageService: DeleteMessageService,
              @Inject(ChatListModel) public chatList: ChatListModel,
              @Inject(NotificationNewMessagesService) private _notificationNewMessageService: NotificationNewMessagesService) {

  }

  onInit() {
    this._chatService
        .listen()
        .subscribe((message) => {
            this._userOnlineMessageService.markMessage(message);
            this._notificationNewMessageService.toggleTitle(message);
            this._mentionService.makeMention(message);
            this.chatList.add(message);
        });

    this._chatTypingService
        .listen()
        .subscribe((message) => {
            this.tMsg = message;
            this.tMsg.typing = true;
            this._deleteMessageService.remove(this.tMsg);
        });
  }

  mentionClickHandler(m: MessageModel):void {
    this.clickMention.next(m);
  }

  clearMessages():void {
    this.chatList.removeAll();
  }
}
