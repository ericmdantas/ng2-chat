import {expect} from 'chai';
import {DidiBot} from '../../server/bots/didi_bot';

describe('didi_bot', () => {
  describe('creation', () => {
    it('should have the right values for the static', () => {
      expect(DidiBot.NAME).to.equal('didi');
    });

    it('should have the right instance', () => {
      let _d = DidiBot.build();

      expect(_d).to.be.defined;
    });
  });
});
