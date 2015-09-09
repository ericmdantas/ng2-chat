export class MessageModel {
  private _message: string;
  private _user: string;
  private _sentAt: string;
  private _color: string;

  constructor({message, user, sentAt, color}: {message?: string, user?:string, sentAt?:string, color?:string} = {}) {
    this.message = message;
    this.user = user;
    this.sentAt = sentAt.substring(16, 24);
    this.color = this.color;
  }

  set message(m: string) {
    this._message = m;
  }

  get message():string {
    return this._message;
  }

  set user(u: string) {
    this._user = u;
  }

  get user():string {
    return this._user;
  }

  set sentAt(sa: string) {
    this._sentAt = sa;
  }

  get sentAt():string {
    return this._sentAt;
  }

  set color(c: string) {
    this._color = c;
  }

  get color():string {
    return this._color;
  }
}
