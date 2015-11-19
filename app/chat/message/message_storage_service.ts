export class MessageStorageService {
  _position: number = 0;
  _messages: string[] = [];

  save(message: string) {
    this._messages.unshift(message);
    this._position = 0;
  }

  getNext():string {
    this._position = this._position > 0 ? --this._position : 0;
    return this._messages[this._position];
  }

  getPrevious():string {
    this._position = this._position > this._messages.length ? this._messages.length : ++this._position;
    return this._messages[this._position];
  }
}
