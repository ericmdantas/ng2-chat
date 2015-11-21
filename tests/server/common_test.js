import {expect} from 'chai';
import {events, mention} from '../../common';

describe('common', () => {
  describe('events', () => {
    it('should have the right values for the constants', () => {
      expect(events.AMNESIA).to.equal('amnesia');
      expect(events.CONNECTION).to.equal('connection');
      expect(events.DISCONNECT).to.equal('disconnect');
      expect(events.MESSAGE).to.equal('msg');
      expect(events.LOGIN).to.equal('login');
      expect(events.TYPING).to.equal('typing');
      expect(events.MESSAGE_COUNT).to.equal('msg_count');
      expect(events.MESSAGE).to.equal('msg');
      expect(events.USER_CONNECTED).to.equal('user_connected');
      expect(events.USER_DISCONNECTED).to.equal('user_disconnected');
      expect(events.PEOPLE_ONLINE).to.equal('people_online');
    })
  })

  describe('mention', () => {
    it('should have the right values', () => {
      expect(mention.AT).to.equal('@');
      expect(mention.SLASH).to.equal('/');
      expect(mention.EVERYBODY).to.equal('all');
    });
  })
})
