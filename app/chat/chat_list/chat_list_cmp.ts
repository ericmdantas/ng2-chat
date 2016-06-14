import {
  Component,
  EventEmitter,
  OnInit,
  Inject,
  forwardRef
} from '@angular/core';

import {ChatService} from 'app/chat/services/chat_service';
import {ChatTypingService} from 'app/chat/services/chat_typing_service';
import {MessageModel} from 'app/chat/message/message_model';
import {NotificationNewMessagesService} from 'app/notifications/notifications_new_messages_service';
import {UserOnlineMessageService} from 'app/chat/chat_list/chat_user_online_message_service';
import {UserStorageService} from 'app/user/user_storage_service';
import {MentionService} from 'app/chat/chat_list/mention_service';
import {DeleteMessageService} from 'app/chat/chat_list/delete_message_service';
import {ChatListModel} from 'app/chat/chat_list/chat_list_model';
import {ScrollBottomService} from 'app/chat/chat_list/scroll_bottom_service';
import {AdminService} from 'app/admin/admin_service';
import {Mib} from 'app/mib/mib';
import {Roll} from 'app/roll/roll';

@Component({
  selector: 'chat-list-cmp',
  providers: [ChatService, UserOnlineMessageService, NotificationNewMessagesService,
             ChatTypingService, MentionService, DeleteMessageService, ScrollBottomService, Mib, Roll, AdminService, UserStorageService],
  events: ['clickMention'],
  templateUrl: 'app/chat/chat_list/chat_list.html',
  styleUrls: ['app/chat/chat_list/chat_list.css']
})
export class ChatListCmp implements OnInit {
  public tMsg: MessageModel = new MessageModel();
  clickMention: EventEmitter<any> = new EventEmitter();
  private _w: Window = window;

  constructor(private _chatService: ChatService,
              private _chatTypingService: ChatTypingService,
              private _userOnlineMessageService: UserOnlineMessageService,
              private _mentionService: MentionService,
              private _deleteMessageService: DeleteMessageService,
              public chatList: ChatListModel,
              private _scrollBottomService: ScrollBottomService,
              private _mib: Mib,
              private _roll: Roll,
              private _admin: AdminService,
              private _notificationNewMessageService: NotificationNewMessagesService,
              private _userStorageService: UserStorageService) {

  }

  ngOnInit() {
    this._chatService
        .listen()
        .subscribe((message) => {
            this._userOnlineMessageService.markMessage(message);
            this._notificationNewMessageService.toggleTitle(message);
            this._mentionService.makeMention(message);
            this.chatList.add(message);
            this._scrollBottomService.goDown();
        });

    this._chatTypingService
        .listen()
        .subscribe((message) => {
            this.tMsg = message;
            this.tMsg.typing = !~this.tMsg.message.indexOf(`${this._userStorageService.getUser().name}:`);
            this._deleteMessageService.remove(this.tMsg);
            this._scrollBottomService.goDown();
        });

    this._mib
        .listen()
        .subscribe(() => {
          this.clearMessages();
          this._mib.flash();
        });

    this._admin
        .listenReload()
        .subscribe(() => {
          this._w.location.reload();
        });

    this._admin
        .listenClean()
        .subscribe(() => {
          this.clearMessages();
        });

    this._admin
        .listenRoll()
        .subscribe(() => {
          this.roll();
        });
  }

  mentionClickHandler(m: MessageModel):void {
    this.clickMention.next(m);
  }

  clearMessages():void {
    this.chatList.removeAll();
  }

  roll():void {
    this._roll.roll();
  }
}
