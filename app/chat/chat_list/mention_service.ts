import {MessageModel} from 'app/chat/message/message_model';
import {UserStorageService} from 'app/user/user_storage_service';
import {Injectable} from '@angular/core';

@Injectable()
export class MentionService {
  private _storageService: UserStorageService = new UserStorageService();
  public static MENTION: string = '@';
  private static EVERYBODY: string = 'all';
  public formMention: string = MentionService.MENTION;

  constructor() {

  }

  makeMention(m: MessageModel):void {
      let _name: string = this._storageService.getUserName();
      let _youWereMentioned: boolean = !!~m.message.indexOf(MentionService.MENTION + _name);
      let _everybodyWasMentioned: boolean = !!~m.message.indexOf(MentionService.MENTION + MentionService.EVERYBODY);

      if (_youWereMentioned || _everybodyWasMentioned) {
          m.mentioned = true;
      }
  }

  wasUserOnlineMentioned(m: MessageModel):boolean {
    let _name: string = this._storageService.getUserName();
    return !!~m.message.indexOf(MentionService.MENTION + _name);
  }

  isSelfMention(m: MessageModel):boolean{
	return this._storageService.getUserName() === m.user;
  }

}
