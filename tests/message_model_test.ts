import {
  it,
  expect,
  describe
} from 'angular2/testing';

import {MessageModel} from '../app/chat/message/message_model';

describe('message_model', () => {
  describe('creation', () => {
    it('instance - empty', () => {
      let _message = new MessageModel();

      expect(_message.message).toBeUndefined();
      expect(_message.user).toBeUndefined();
      expect(_message.bot).toBeUndefined();
      expect(_message.deleteTime).toBeUndefined();
      expect(_message.hash).toBeUndefined();
      expect(_message.canRepeat).toBeUndefined();
    });

    it('instance - full', () => {
      let _m = {
        message: 'a',
        user: 'b',
        sentAt: 123456789,
        bot: true,
        deleteTime: 123,
        hash: 'c',
        canRepeat: false
      };

      let _message = new MessageModel(_m);

      for (let prop in _m) {
        if (prop !== "sentAt") {
          expect(_m[prop]).toEqual(_message[prop]);
        }
      }
    });
  });
});
