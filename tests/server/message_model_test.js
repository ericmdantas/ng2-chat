import {expect} from 'chai';
import {MessageModel} from '../../server/message_model';

describe('message_model', () => {
  describe('creation', () => {
    it('should create an empty instance with the right values', () => {
      let _m = new MessageModel();

      expect(_m.sentAt).to.be.defined;
      expect(typeof _m.sentAt).to.equal('string');
      expect(_m.message).to.equal('');
      expect(_m.bot).to.equal(false);
      expect(_m.deleteTime).to.equal(0);
      expect(_m.hash).to.be.defined;
      expect(typeof _m.hash).to.equal('number');
      expect(_m.canRepeat).to.be.true;
    });
  });
});
