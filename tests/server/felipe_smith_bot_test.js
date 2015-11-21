import {expect} from 'chai';
import {FelipeSmithBot} from '../../server/bots/felipe_smith_bot';

describe('felipe_smith_bot', () => {
  describe('creation', () => {
    it('should have the right values for the static', () => {
      expect(FelipeSmithBot.NAME).to.equal('felipe.smith');
      expect(FelipeSmithBot.TALK_TIME).to.equal(8 * 1000 * 60 * 60); // 8 hours
    });
  });

  describe('wasMentioned', () => {
    it('should return false', () => {
      let _fs = ['felip', 'smit'];
      let _f = FelipeSmithBot.build();

      _fs.forEach((f) => {
        expect(_f.wasMentioned(f)).to.be.false;
      });
    });

    it('should return true', () => {
      let _fs = ['felipe', 'smith', 'alo alo felipe'];
      let _f = FelipeSmithBot.build();

      _fs.forEach((f) => {
        expect(_f.wasMentioned(f)).to.be.true;
      });
    });
  });
});
