import {expect} from 'chai';
import {FightBot} from '../../server/bots/fight_bot';

describe('fight_bot', () => {
  describe('creation', () => {
    it('should have the right values for static', () => {
      expect(FightBot.NAME).to.equal('bruce.buffer');
      expect(FightBot.MAX_ATTACK).to.equal(49);
      expect(FightBot.FULL_HP).to.equal(100);
    });

    it('should create a instance correctly', () => {
      let _f = FightBot.build();

      expect(_f).to.be.defined;
    });
  });

  describe('wasMentioned', () => {
    it('should return false', () => {
      let _fs = ['figh', 'f', 'f!'];
      let _f = FightBot.build();

      _fs.forEach((f) => {
        expect(_f.wasMentioned(f)).to.be.false;
      });
    });

    it('should return true', () => {
      let _fs = ['fight', "it's time!", 'time'];
      let _f = FightBot.build();

      _fs.forEach((f) => {
        expect(_f.wasMentioned(f)).to.be.true;
      });
    });
  });
});
