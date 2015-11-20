import express from 'express';
import fs from 'fs';
import socketIo from 'socket.io';
import _ from 'lodash';

import {MessageModel} from './message_model';
import {BotFactory} from './bots/bot_factory';
import {events} from '../common';

const PORT = 9999;

const app = express();
const server = app.listen(PORT);
const io = socketIo(server);

let _connections = new Map();

let _peopleOnline = 0;
let _messageCount = {num: 0}; // reference

let _fm = BotFactory.create("felipe.smith");
let _x9 = BotFactory.create("x9");
let _porteiro = BotFactory.create("porteiro");
let _didi = BotFactory.create("didi");
let _helper = BotFactory.create("helper");
let _stats = BotFactory.create("stats");
let _scotty = BotFactory.create("scotty");
let _mib = BotFactory.create("mib");

export function init() {
  app.use(express.static('./'));

  app.get('/', (req, res) => {
    fs.createReadStream(__dirname + '../index.html')
    .pipe(res);
  });

  io.on(events.CONNECTION, (socket) => {
    _peopleOnline++;

    socket.on(events.MESSAGE, (data) => {

      let _message = new MessageModel()
      .withMessage(data.info)
      .withUser(data.user)
      .isBot(false);

      if (_x9.wasMentioned(data.info)) {
        return _x9.respondWhosOnline(socket, _connections);
      }

      if (_helper.wasMentioned(data.info)) {
        return _helper.talk(socket);
      }

      if (_stats.wasMentioned(data.info)) {
        return _stats.respond(socket, _x9, _connections, _messageCount);
      }

      io.emit(events.MESSAGE, _message);
      io.emit(events.MESSAGE_COUNT, _messageCount.num++);

      if (_scotty.wasMentioned(data.info)) {
        _scotty.beamUp(io);
      }

      if (_fm.wasMentioned(data.info)) {
        setTimeout(() => {
          io.emit(events.MESSAGE, _fm.respond());
          io.emit(events.MESSAGE_COUNT, _messageCount.num++);
        }, 333);
      }

      if (_didi.wasMentioned(data.info)) {
        _didi.respond(io);
      }

    });

    socket.on(events.DISCONNECT, () => {
      _peopleOnline--;

      _connections.forEach((value, prop) => {
        if (_connections.get(prop).id === socket.id) {
          _x9.left(socket, prop);
          return _connections.delete(prop);
        }
      });

      io.emit(events.PEOPLE_ONLINE, _peopleOnline);
    });

    socket.on(events.LOGIN, ({user}) => {
      _connections.set(user, socket);

      _x9.entered(socket, user, _connections);
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