/// <reference path="typings/tsd.d.ts" />

import * as express from 'express';
import * as fs from 'fs';
import * as socketIo from 'socket.io';

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

app.use(express.static('./'));

app.get('/', (req, res) => {
  fs.createReadStream(__dirname + '/index.html')
    .pipe(res);
});

io.on(events.CONNECTION, (socket) => {
  _peopleOnline++;

  socket.on(events.MESSAGE, (data: {info: string, user: string}) => {

    _messageCount.num++;

    _connections[data.user] = socket;

    let _message = new MessageModel()
                      .withMessage(data.info)
                      .withUser(data.user)
                      .isBot(false);

    io.emit(events.MESSAGE, _message);
    io.emit(events.MESSAGE_COUNT, _messageCount.num);
  });

  socket.on(events.DISCONNECT, () => {
    _peopleOnline--;

    Object
      .keys(_connections)
      .forEach((prop) => {

        if (_connections[prop].id === socket.id) {
              return _x9.left(io, prop);
        }
      });

    io.emit(events.PEOPLE_ONLINE, _peopleOnline);
  });

  io.emit(events.PEOPLE_ONLINE, _peopleOnline);

});

BotFactory.create("felipe.smith").scheduleTalk(io, _messageCount);

console.log(`listening on port: ${PORT}`);
