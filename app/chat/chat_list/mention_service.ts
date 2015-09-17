/// <reference path="../../../typings/tsd.d.ts" />

import {MessageModel} from 'app/chat/model/message_model.js';
import {UserStorageService} from 'app/user_storage/user_storage_service.js';

export class MentionService {
  private _storageService: UserStorageService = new UserStorageService();
  private static MENTION: string = '@';
  private static EVERYBODY: string = 'all';

  constructor() {

  }

  makeMention(m: MessageModel):void {
      let _name: string = this._storageService.getUser().name;
      let _youWereMentioned: boolean = m.message.indexOf(MentionService.MENTION + _name) > -1;
      let _everybodyWasMentioned: boolean = m.message.indexOf(MentionService.MENTION + MentionService.EVERYBODY) > -1;

      if (_youWereMentioned || _everybodyWasMentioned) {
          m.mentioned = true;
      }
  }
}
