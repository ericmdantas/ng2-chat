import {MessageModel} from 'app/chat/model/message_model.js';

export class DeleteMessageService {
  remove(messageList: MessageModel[], message:MessageModel) {
    setTimeout(() => {
      let _index = messageList.indexOf(message);

      if (_index > -1)
        messageList.splice(_index, 1);

    }, message.deleteTime);
  }
}
