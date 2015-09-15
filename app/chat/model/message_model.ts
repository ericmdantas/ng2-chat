export class MessageModel {
  private _message: string;
  private _user: string;
  private _sentAt: string;
  private _bot: boolean;

  constructor({message, user, sentAt, bot}: {message?: string, user?:string, sentAt?:string, bot?:boolean} = {}) {
    this.message = message;
    this.user = user;
    this.sentAt = sentAt.substring(16, 24);
    this.bot = bot;
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

  set bot(b: boolean) {
    this._bot = b;
  }

  get bot():boolean {
    return this._bot;
  }
}
