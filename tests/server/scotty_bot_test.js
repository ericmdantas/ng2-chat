import {expect} from 'chai';
import {ScottyBot} from '../../server/bots/scotty_bot';

describe('scotty_bot', () => {
  describe('creation', () => {
    it('should have the right values for the static', () => {
      expect(ScottyBot.NAME).to.equal('scotty');
    });

    it('should create a correct instance', () => {
      let _s = ScottyBot.build();

      expect(_s).to.be.defined;
    });
  });

  describe('wasMentioned', () => {
    it('should return false', () => {
      let _ss = ['ss', 'beam up', 'up!'];
      let _s = ScottyBot.build();

      _ss.forEach((s) => {
        expect(_s.wasMentioned(s)).to.be.false;
      });
    });

    it('should return true', () => {
      let _ss = ['scotty', 'beam me up', 'up', 'arriba'];
      let _s = ScottyBot.build();

      _ss.forEach((s) => {
        expect(_s.wasMentioned(s)).to.be.true;
      });
    });
  });
});
