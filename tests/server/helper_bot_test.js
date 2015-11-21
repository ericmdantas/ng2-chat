import {expect} from 'chai';
import {HelperBot} from '../../server/bots/helper_bot';

describe('helper_bot', () => {
  describe('creation', () => {
    it('should have the right values for the static', () => {
      expect(HelperBot.NAME).to.equal('helper');
      expect(HelperBot.HELP_STUFF).to.equal('ls | exit | cls | stats | @nome | up | fight');
    });

    it('should call build and return an instance', () => {
      let _h = HelperBot.build();

      expect(_h).to.be.defined;
    });
  });

  describe('wasMentioned', () => {
    it('should return false', () => {
      let _hs = ['h', 'hp', 'hlp'];
      let _h = HelperBot.build();

      _hs.forEach((h) => {
        expect(_h.wasMentioned(h)).to.be.false;
      });
    })

    it('should return true', () => {
      let _hs = ['help', '/help', '--help', '--h'];
      let _h = HelperBot.build();

      _hs.forEach((h) => {
        expect(_h.wasMentioned(h)).to.be.true;
      });
    })
  });
});
