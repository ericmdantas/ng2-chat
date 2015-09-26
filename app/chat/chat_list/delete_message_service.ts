import {MessageModel} from 'app/chat/model/message_model.js';

export class DeleteMessageService {
  remove(message:MessageModel) {
    setTimeout(() => {
      debugger;
      message.deleted = true;
      message.typing = false;
    }, message.deleteTime);
  }
}
