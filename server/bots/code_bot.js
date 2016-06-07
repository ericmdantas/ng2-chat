import {events} from '../../common';

export class CodeBot {
    static NAME = 'code';

    respond(io, msg) {
      io.emit(events.CODE, msg);
    }

    static build() {
      return new CodeBot();
    }
}
