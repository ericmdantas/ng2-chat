export class UserModel {
  private _name: string;

  set name(n: string) {
    this._name = n;
  }

  get name(): string {
    return this._name;
  }
}
