import {
  it,
  expect,
  describe
} from 'angular2/testing';

import {MessageStorageService} from '../app/chat/message/message_storage_service';

describe('message_storage_service', () => {
  describe('creation', () => {
    it('should have the right values for the props', () => {
      let _m = new MessageStorageService();

      expect(_m._position).toBe(0);
      expect(_m._messages).toEqual([]);
    });
  });

  describe('save', () => {
    it('should save the message and set the position to 0', () => {
      let _m = new MessageStorageService();

      _m.save('a');

      expect(_m._messages.length).toBe(1);
      expect(_m._messages[0]).toBe('a');
      expect(_m._position).toBe(0);

      _m.save('b');

      expect(_m._messages.length).toBe(2);
      expect(_m._messages[0]).toBe('b');
      expect(_m._messages[1]).toBe('a');
      expect(_m._position).toBe(0);
    });
  });

  describe('getNext', () => {
    it('should return the right message', () => {
      let _m = new MessageStorageService();

      _m.save('a');
      _m.save('b');
      _m.save('c');

      expect(_m.getNext()).toBe('c');
    });
  });

  describe('getPrevious', () => {
    it('should return the right message', () => {
      let _m = new MessageStorageService();

      _m.save('a');
      _m.save('b');
      _m.save('c');

      expect(_m.getPrevious()).toBe('b');
    });
  });
});
