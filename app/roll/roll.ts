import {
    Component,
    Injectable
} from '@angular/core';

import {
    Observable
} from 'rxjs/Observable';

@Injectable()
export class Roll {
  private _socket: SocketIOStatic = io('');
  private _doc: Document = document;
  public TIME_OF_ROLL_IN_SEC: number = 2;
  public rolling = false;

  roll() {
    if (!this.rolling){
        let _roller = this._doc.getElementById('prompt');
        this.rolling = true;

        _roller.style.transitionTimingFunction = 'ease';
        _roller.style.transition = this.TIME_OF_ROLL_IN_SEC + 's';
        _roller.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            _roller.style.transitionTimingFunction = 'none';
            _roller.style.transition = '0s';
            _roller.style.transform = 'rotate(0deg)';
            this.rolling = false;
        }, this.TIME_OF_ROLL_IN_SEC * 1000 + 200);
    }
  }
}
