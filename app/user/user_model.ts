export class UserModel {
  private _name: string;

  constructor({name}: {name: string} = {name: ''}) {
    this._name = name;
  }

  set name(n: string) {
    this._name = n;
  }

  get name(): string {
    return this._name;
  }
}
