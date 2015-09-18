/// <reference path="../../../typings/tsd.d.ts" />

import {UserStorageService} from 'app/user/user_storage_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';
import {ChatService} from 'app/chat/services/chat_service.js'
import {ChatListCmp} from 'app/chat/chat_list/chat_list_cmp.js';

export class UserOnlineMessageService {
  private _userStorageService: UserStorageService = new UserStorageService();

  constructor() {

  }

  markMessage(m: MessageModel):void {
    if (this._userStorageService.getUserName() === m.user) {
        m.userOnline = true;
    }
  }
}
