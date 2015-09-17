/// <reference path="../../../typings/tsd.d.ts" />

import {StorageService} from 'app/storage/storage_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';
import {ChatService} from 'app/chat/services/chat_service.js'
import {ChatListCmp} from 'app/chat/chat_list/chat_list_cmp.js';

export class UserOnlineMessageService {
  private _storageService: StorageService = new StorageService();

  constructor() {

  }

  markMessage(m: MessageModel):void {
    if (this._storageService.getUser().name === m.user) {
        m.userOnline = true;
    }
  }
}
