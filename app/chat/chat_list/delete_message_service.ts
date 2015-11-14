export class DeleteMessageService {
  remove(message:MessageModel) {
    setTimeout(() => {
      message.deleted = true;
      message.typing = false;
    }, message.deleteTime);
  }
}
