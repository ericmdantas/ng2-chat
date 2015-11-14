import {UserStorageService} from 'app/user/user_storage_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';
import {MentionService} from 'app/chat/chat_list/mention_service.js';

export class NotificationNewMessagesService {
  public static DEFAULT_TITLE: string = '_';
  public static REPEATER: number = 555;

  private _doc: Document = document;
  private _userStorageService: UserStorageService = new UserStorageService();
  private _mentionService: MentionService = new MentionService();

  constructor() {
    this._doc.title = NotificationNewMessagesService.DEFAULT_TITLE;
  }

  toggleTitle(m: MessageModel):void {
    let _idInterval = setInterval(() => {

      let _warning = (this._mentionService.wasUserOnlineMentioned(m)) ? '@' : '!';

      this._doc.title = (this._doc.title === _warning) ? NotificationNewMessagesService.DEFAULT_TITLE : _warning;

      if (this._doc.hasFocus()) {
          this._doc.title = NotificationNewMessagesService.DEFAULT_TITLE;

          clearInterval(_idInterval);
      }

    }, NotificationNewMessagesService.REPEATER);
  }
}
