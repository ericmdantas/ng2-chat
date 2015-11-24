import {
  Component,
  EventEmitter,
  OnInit,
  CORE_DIRECTIVES,
  Inject,
  forwardRef
} from 'angular2/angular2';

import {ChatService} from 'app/chat/services/chat_service.js';
import {ChatTypingService} from 'app/chat/services/chat_typing_service.js';
import {MessageModel} from 'app/chat/message/message_model.js';
import {NotificationNewMessagesService} from 'app/notifications/notifications_new_messages_service.js';
import {UserOnlineMessageService} from 'app/chat/chat_list/chat_user_online_message_service.js';
import {MentionService} from 'app/chat/chat_list/mention_service.js';
import {DeleteMessageService} from 'app/chat/chat_list/delete_message_service.js';
import {ChatListModel} from 'app/chat/chat_list/chat_list_model.js';
import {ScrollBottomService} from 'app/chat/chat_list/scroll_bottom_service.js';
import {AdminService} from 'app/admin/admin_service.js';
import {Mib} from 'app/mib/mib.js';

@Component({
  selector: 'chat-list-cmp',
  providers: [ChatService, UserOnlineMessageService, NotificationNewMessagesService,
             ChatTypingService, MentionService, DeleteMessageService, ScrollBottomService, Mib, AdminService],
  events: ['clickMention'],
  templateUrl: 'app/chat/chat_list/chat_list.html',
  styleUrls: ['app/chat/chat_list/chat_list.css'],
  directives: [CORE_DIRECTIVES]
})
export class ChatListCmp implements OnInit {
  public tMsg: MessageModel = new MessageModel();
  clickMention: EventEmitter = new EventEmitter();
  private _w: Window = window;

  constructor(@Inject(ChatService) private _chatService: ChatService,
              @Inject(ChatTypingService) private _chatTypingService: ChatTypingService,
              @Inject(UserOnlineMessageService) private _userOnlineMessageService: UserOnlineMessageService,
              @Inject(MentionService) private _mentionService: MentionService,
              @Inject(DeleteMessageService) private _deleteMessageService: DeleteMessageService,
              @Inject(ChatListModel) public chatList: ChatListModel,
              @Inject(ScrollBottomService) private _scrollBottomService: ScrollBottomService,
              @Inject(Mib) private _mib: Mib,
              @Inject(AdminService) private _admin: AdminService,
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
            this._scrollBottomService.goDown();
        });

    this._chatTypingService
        .listen()
        .subscribe((message) => {
            this.tMsg = message;
            this.tMsg.typing = true;
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
  }

  mentionClickHandler(m: MessageModel):void {
    this.clickMention.next(m);
  }

  clearMessages():void {
    this.chatList.removeAll();
  }
}
