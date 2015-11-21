import {expect} from 'chai';
import {MibBot} from '../../server/bots/mib_bot';

describe('mib_bot', () => {
  describe('creation', () => {
    it('should have the right values for the static', () => {
      expect(MibBot.NAME).to.equal('mib');
      expect(MibBot.TIME).to.equal(8 * 1000 * 60 * 60); // 8 hours
    });

    it('should return a right instance correctly', () => {
      let _m = MibBot.build();

      expect(_m).to.be.defined;
    });
  });
});
