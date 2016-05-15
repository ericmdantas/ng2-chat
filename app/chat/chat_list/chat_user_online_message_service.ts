import {UserStorageService} from 'app/user/user_storage_service';
import {MessageModel} from 'app/chat/message/message_model';
import {ChatService} from 'app/chat/services/chat_service'
import {ChatListCmp} from 'app/chat/chat_list/chat_list_cmp';

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
