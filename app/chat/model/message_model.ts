export class MessageModel {
  private _message: string;
  private _user: string;
  private _sentAt: string;

  constructor({message, user, sentAt}: {message?: string, user?:string, sentAt?:string} = {}) {
    this.message = message;
    this.user = user;
    this.sentAt = sentAt.substring(16, 24);
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

  set timeSent(sa: string) {
    this._sentAt = sa;
  }

  get timeSent():string {
    return this._sentAt;
  }
}
