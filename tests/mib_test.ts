import {
  it,
  describe,
  expect
} from 'angular2/testing';

import {Mib} from '../app/mib/mib';

describe('mib', () => {
  describe('creation', () => {
    it('should have the right value for statics', () => {
      let _mib = new Mib();
      expect(_mib.TIME_HIDES_BACKGROUND).toBe(1000);
    });
  });

  describe('flash', () => {
    it('should call it correctly', () => {
      let _mib = new Mib();

      spyOn(_mib._doc, 'getElementById').and.returnValue({
        style: {
          
        }
      })

      _mib.flash();
    });
  });

  describe('listen', () => {
    it('should call it correctly', () => {
      let _mib = new Mib();

      _mib.listen();
    });
  });
});
