import {events} from '../../common.js';
import {MessageModel} from '../message_model.js';

export class ScottyBot {
  static NAME: string = 'scotty';
  static TP: string[] = [
    '˙•.',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '  o',
    ' /|\\',
    ' /\\',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋱⋱⋱',
    '⋮⋮⋮⋮',
    '⋰⋰⋰',
    '⋰⋰⋰',
    '˙•.',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ];
  private _teletransporting: boolean = false;

  wasMentioned(message:string):boolean {
    let _msg = message.toLowerCase();

    return (_msg === "scotty") || (_msg === "beam me up") || (_msg === "up") || (_msg === "arriba");
  }

  beamUp(io: SocketIOStatic) {
    let _msg = new MessageModel()
                    .withUser(ScottyBot.NAME)
                    .isBot(true);

    if (!this._teletransporting)
         this._teletransport(io, _msg, events.MESSAGE);
  }

  private _teletransport(io, msg, event) {
    const MAX_COUNT = ScottyBot.TP.length;
    let count = 0;

    this._teletransporting = true;

    let _idInterval = setInterval(() => {

      msg.withMessage(ScottyBot.TP[count]);

      if (count >= MAX_COUNT) {
        this._teletransporting = false;
        return clearInterval(_idInterval);
      }

      io.emit(event, msg);

      count++;
    }, 55);
  }

  static build():ScottyBot {
    return new ScottyBot();
  }
}
