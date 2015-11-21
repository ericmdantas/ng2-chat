import {expect} from 'chai';
import {StatsBot} from '../../server/bots/stats_bot';

describe('stats_bot', () => {
  describe('creation', () => {
    it('should have the right values for the static', () => {
      expect(StatsBot.NAME).to.equal('stats');
    });

    it('should return an instance correctly', () => {
      let _s = StatsBot.build();

      expect(_s).to.be.defined;
    });
  });

  describe('wasMentioned', () => {
    it('should return false', () => {
      let _ss = ['s', 'ss', 'staz'];
      let _s = StatsBot.build();

      _ss.forEach((s) => {
        expect(_s.wasMentioned(s)).to.be.false;
      });
    });

    it('should return false', () => {
      let _ss = ['stat', 'stats', 'status'];
      let _s = StatsBot.build();

      _ss.forEach((s) => {
        expect(_s.wasMentioned(s)).to.be.true;
      });
    });
  });
});
