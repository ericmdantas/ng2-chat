import express from 'express';
import fs from 'fs';
import socketIo from 'socket.io';

import {MessageModel} from './message_model';
import {BotFactory} from './bots/bot_factory';
import {events} from '../common';

const PORT = 9999;

const app = express();
const server = app.listen(PORT);
const io = socketIo(server);

let _connections = new Map();

let _peopleOnline = 0;
let _messageCount = {num: 0};

let _fm = BotFactory.create("felipe.smith");
let _x9 = BotFactory.create("x9");
let _porteiro = BotFactory.create("porteiro");
let _didi = BotFactory.create("didi");
let _helper = BotFactory.create("helper");
let _stats = BotFactory.create("stats");
let _scotty = BotFactory.create("scotty");
let _mib = BotFactory.create("mib");
let _fight = BotFactory.create("fight");
let _admin = BotFactory.create("admin");

export function init() {
  app.use(express.static('./'));

  app.get('/', (req, res) => {
    fs.createReadStream(__dirname + '../index.html')
      .pipe(res);
  });

  io.on(events.CONNECTION, (socket) => {
    _peopleOnline++;

    socket.on(events.MESSAGE, ({user, info}) => {

      let _message = new MessageModel()
                      .withMessage(info)
                      .withUser(user)
                      .isBot(false);

      if (_x9.wasMentioned(info)) {
        return _x9.respondWhosOnline(socket, _connections);
      }

      if (_helper.wasMentioned(info)) {
        return _helper.talk(socket);
      }

      if (_stats.wasMentioned(info)) {
        return _stats.respond(socket, _x9, _connections, _messageCount);
      }

      if (_admin.wasMentioned(info)) {
        if (_admin.isItReload(info)) {
          return _admin.doReload(io);
        }

        if (_admin.isItClean(info)) {
          return _admin.doClean(io);
        }

        if (_admin.isItRoll(info)) {
          return _admin.doRoll(io);
        }
      }

      io.emit(events.MESSAGE, _message);
      io.emit(events.MESSAGE_COUNT, _messageCount.num++);

      if (_fight.wasMentioned(info)) {
        _fight.fight(io);
      }

      if (_didi.wasMentioned(info)) {
        _didi.respond(io);
      }

      if (_scotty.wasMentioned(info)) {
        _scotty.beamUp(io);
      }

      if (_fm.wasMentioned(info)) {
        setTimeout(() => {
          io.emit(events.MESSAGE, _fm.respond());
          io.emit(events.MESSAGE_COUNT, _messageCount.num++);
        }, 333);
      }
    });

    socket.on(events.DISCONNECT, () => {
      _peopleOnline--;

      _connections.forEach((value, prop) => {
        if (_connections.get(prop).id === socket.id) {
          _x9.left(socket, prop);
          _connections.delete(prop);
          _fight.players.delete(prop);
          return;
        }
      });

      io.emit(events.PEOPLE_ONLINE, _peopleOnline);
    });

    socket.on(events.LOGIN, ({user}) => {
      _connections.set(user, socket);

      _x9.entered(socket, user, _connections);
      _fight.init(user, _connections.get(user).id);
      _porteiro.talk(socket, user);
    });

    socket.on(events.TYPING, ({user}) => {
      _x9.isTyping(socket, user);
    });

    io.emit(events.PEOPLE_ONLINE, _peopleOnline);
  });

  _fm.scheduleTalk(io, _messageCount);
  _mib.scheduleTalk(io);

  console.log(`listening on port: ${PORT}`);
}
