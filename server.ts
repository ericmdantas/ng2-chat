/// <reference path="typings/tsd.d.ts" />

import * as express from 'express';
import * as fs from 'fs';
import * as socketIo from 'socket.io';
import * as _ from 'lodash';

import {MessageModel} from './server/message_model.js';
import {BotFactory} from './server/bot_factory.js';
import {events} from './server/events.js';

const PORT: number = 9999;

const app = express();
const server = app.listen(PORT);
const io = socketIo(server);

let _connections: {} = <any>{};

let _peopleOnline: number = 0;
let _messageCount: {num: number} = {num: 0}; // reference

let _x9 = BotFactory.create("x9");
let _fm = BotFactory.create("felipe.smith");
let _porteiro = BotFactory.create("porteiro");

app.use(express.static('./'));

app.get('/', (req, res) => {
  fs.createReadStream(__dirname + '/index.html')
    .pipe(res);
});

io.on(events.CONNECTION, (socket) => {
  _peopleOnline++;

  socket.on(events.MESSAGE, (data: {info: string, user: string}) => {

    _connections[data.user] = socket;

    let _message = new MessageModel()
                      .withMessage(data.info)
                      .withUser(data.user)
                      .isBot(false);

    io.emit(events.MESSAGE, _message);
    io.emit(events.MESSAGE_COUNT, _messageCount.num++);

    if (_fm.wasMentioned(data)) {
      setTimeout(() => {
        io.emit(events.MESSAGE, _fm.respond());
        io.emit(events.MESSAGE_COUNT, _messageCount.num++);
      }, 333);
    }
  });

  socket.on(events.DISCONNECT, () => {
    _peopleOnline--;

    _.keys(_connections)
     .forEach((prop) => {
        if (_connections[prop].id === socket.id) {
              return _x9.left(socket, prop);
        }
      });

    io.emit(events.PEOPLE_ONLINE, _peopleOnline);
  });

  socket.on(events.LOGIN, ({user}) => {
    _connections[user] = socket;

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
