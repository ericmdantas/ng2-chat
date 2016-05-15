import {MessageModel} from '../message/message_model';

export class DeleteMessageService {
  remove(message:MessageModel) {
    setTimeout(() => {
      message.deleted = true;
      message.typing = false;
    }, message.deleteTime);
  }
}
