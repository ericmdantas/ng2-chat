import {MessageModel} from '../message/message_model';
import {Injectable} from '@angular/core';

@Injectable()
export class DeleteMessageService {
  remove(message:MessageModel) {
    setTimeout(() => {
      message.deleted = true;
      message.typing = false;
    }, message.deleteTime);
  }
}
