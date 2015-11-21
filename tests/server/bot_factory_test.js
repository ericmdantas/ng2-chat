import {expect} from 'chai';

import {BotFactory} from '../../server/bots/bot_factory';
import {DidiBot} from '../../server/bots/didi_bot';
import {FelipeSmithBot} from '../../server/bots/felipe_smith_bot';
import {FightBot} from '../../server/bots/fight_bot';
import {HelperBot} from '../../server/bots/helper_bot';
import {MibBot} from '../../server/bots/mib_bot';
import {PorteiroBot} from '../../server/bots/porteiro_bot';
import {ScottyBot} from '../../server/bots/scotty_bot';
import {StatsBot} from '../../server/bots/stats_bot';
import {X9Bot} from '../../server/bots/x9_bot';

describe('bot_factory', () => {
  describe('returning instances', () => {
    it('didi', () => {
      expect(BotFactory.create('didi')).to.be.an.instanceof(DidiBot);
    });

    it('felipe.smith', () => {
      expect(BotFactory.create('felipe.smith')).to.be.an.instanceof(FelipeSmithBot);
    });

    it('helper', () => {
      expect(BotFactory.create('helper')).to.be.an.instanceof(HelperBot);
    });

    it('mib', () => {
      expect(BotFactory.create('mib')).to.be.an.instanceof(MibBot);
    });

    it('porteiro', () => {
      expect(BotFactory.create('porteiro')).to.be.an.instanceof(PorteiroBot);
    });

    it('scotty', () => {
      expect(BotFactory.create('scotty')).to.be.an.instanceof(ScottyBot);
    });

    it('stats', () => {
      expect(BotFactory.create('stats')).to.be.an.instanceof(StatsBot);
    });

    it('fight', () => {
      expect(BotFactory.create('fight')).to.be.an.instanceof(FightBot);
    });

    it('x9', () => {
      expect(BotFactory.create('x9')).to.be.an.instanceof(X9Bot);
    });
  })
})
