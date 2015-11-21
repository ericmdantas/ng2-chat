import {expect} from 'chai';
import {X9Bot} from '../../server/bots/x9_bot';

describe('x9_bot', () => {
  describe('creation', () => {
    it('should have the right values for the static', () => {
      expect(X9Bot.NAME).to.equal('x9');
    });

    it('should have the right instance', () => {
      let _x9 = X9Bot.build();

      expect(_x9).to.be.defined;
    });
  });

  describe('wasMentioned', () => {
    it('should return false', () => {
      let _xs = ['lls', 's'];
      let _x = X9Bot.build();

      _xs.forEach((x) => {
        expect(_x.wasMentioned(x)).to.be.false;
      });
    });

    it('should return false', () => {
      let _xs = ['ls'];
      let _x = X9Bot.build();

      _xs.forEach((x) => {
        expect(_x.wasMentioned(x)).to.be.true;
      });
    });
  });
});
