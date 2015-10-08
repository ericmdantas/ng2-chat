export class MessageStorageService {
  private static KEY: string = 'm';
  private _position: number = 0;
  private _messages: string[] = [];

  save(message: string) {
    this._messages.unshift(message);
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
