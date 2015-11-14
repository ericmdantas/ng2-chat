export class ChatListModel {
  public messages: MessageModel[] = [];

  add(m: MessageModel):void {
    this.messages.push(m);
  }

  removeAll():void {
    this.messages.length = 0;
  }
}
