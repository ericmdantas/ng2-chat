import {expect} from 'chai';
import {PorteiroBot} from '../../server/bots/porteiro_bot';

describe('porteiro_bot', () => {
  describe('creation', () => {
    it('should have the right values for the static', () => {
      expect(PorteiroBot.NAME).to.equal('porteiro');
    });

    it('should create a new instance', () => {
      let _p = PorteiroBot.build();

      expect(_p).to.be.defined;
    });
  });
});
