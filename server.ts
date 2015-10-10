/// <reference path="typings/tsd.d.ts" />

import * as express from 'express';
import * as fs from 'fs';
import * as socketIo from 'socket.io';
import * as _ from 'lodash';

import {MessageModel} from './server/message_model.js';
import {BotFactory} from './server/bot_factory.js';
import {events} from './common.js';

const PORT: number = 9999;

const app = express();
const server = app.listen(PORT);
const io = socketIo(server);

let _connections: Map = new Map();

let _peopleOnline: number = 0;
let _messageCount: {num: number} = {num: 0}; // reference

let _x9 = BotFactory.create("x9");
let _fm = BotFactory.create("felipe.smith");
let _porteiro = BotFactory.create("porteiro");
let _didi = BotFactory.create("didi");
let _helper = BotFactory.create("helper");
let _stats = BotFactory.create("stats");

app.use(express.static('./'));

app.get('/', (req, res) => {
  fs.createReadStream(__dirname + '/index.html')
    .pipe(res);
});

io.on(events.CONNECTION, (socket) => {
  _peopleOnline++;

  socket.on(events.MESSAGE, (data: {info: string, user: string}) => {

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

    io.emit(events.MESSAGE, _message);
    io.emit(events.MESSAGE_COUNT, _messageCount.num++);

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

    _connections
      .forEach((value, prop) => {
        if (_connections.get(prop).id === socket.id) {
          _x9.left(socket, prop);
          _connections.delete(prop);
          return;
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

console.log(`listening on port: ${PORT}`);
