import {
  it,
  expect,
  describe
} from 'angular2/testing';

import {UserModel} from '../app/user/user_model';

describe('user_model', () => {
  describe('creation', () => {
    it('instance', () => {
      let _user = new UserModel();

      expect(_user.name).toBeUndefined();
    });
  });

  describe('setNome', () => {
    it('should change name correctly', () => {
      let _user = new UserModel();

      expect(_user.name).toBeUndefined();

      _user.name = 'abc';

      expect(_user.name).toBe('abc');
    });
  });
});
