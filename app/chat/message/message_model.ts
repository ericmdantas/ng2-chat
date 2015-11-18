export class MessageModel {
  private _message: string;
  private _user: string;
  private _sentAt: Date;
  private _bot: boolean;
  private _deleteTime: number;
  private _hash: string | number;
  private _canRepeat: boolean = true;
  private _deleted: boolean = false;
  private _typing: boolean = false;

  constructor({message, user, sentAt, bot, deleteTime, hash, canRepeat}
              :{message?: string, user?:string, sentAt?:string, bot?:boolean, deleteTime?:number, hash?:string|number, canRepeat?:boolean} = {}) {

    this.message = message;
    this.user = user;
    this.sentAt = new Date(sentAt);
    this.bot = bot;
    this.deleteTime = deleteTime;
    this.hash = hash;
    this.canRepeat = canRepeat;
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
    this._sentAt = new Date(sa);
  }

  get sentAt():Date {
    return this._sentAt;
  }

  set bot(b: boolean) {
    this._bot = b;
  }

  get bot():boolean {
    return this._bot;
  }

  set deleteTime(t: number) {
    this._deleteTime = t;
  }

  get deleteTime():number {
    return this._deleteTime;
  }

  set hash(h: string | number) {
    this._hash = h;
  }

  get hash():string | number {
    return this._hash;
  }

  set canRepeat(b: boolean) {
    this._canRepeat = b;
  }

  get canRepeat():boolean {
    return this._canRepeat;
  }

  set deleted(d: boolean) {
    this._deleted = d;
  }

  get deleted():boolean {
    return this._deleted;
  }

  set typing(b: boolean) {
    this._typing = b;
  }

  get typing():boolean {
    return this._typing;
  }
}
