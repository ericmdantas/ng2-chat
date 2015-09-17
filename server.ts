/// <reference path="typings/tsd.d.ts" />

import * as express from 'express';
import * as fs from 'fs';
import * as socketIo from 'socket.io';

import {MessageModel} from './server/message_model.js';
import {BotTalk} from './server/bot_talk.js';
import {events} from './server/events.js';

const PORT: number = 9999;

const app = express();
const server = app.listen(PORT);
const io = socketIo(server);

let _peopleOnline: number = 0;
let _messageCount: {num: number} = {num: 0}; // reference

let _bot = new BotTalk();

app.use(express.static('./'));

app.get('/', (req, res) => {
  fs.createReadStream(__dirname + '/index.html')
    .pipe(res);
});

io.on(events.CONNECTION, (socket) => {
  _peopleOnline++;

  io.emit(events.PEOPLE_ONLINE, _peopleOnline)

  socket.on(events.MESSAGE, (data: {info: string, user: string}) => {

    _messageCount.num++;

    let _message = new MessageModel()
                      .withMessage(data.info)
                      .withUser(data.user)
                      .withSentAt(new Date().toString())
                      .isBot(false);

    io.emit(events.MESSAGE, _message);
    io.emit(events.MESSAGE_COUNT, _messageCount.num);
  });

  socket.on(events.DISCONNECT, (socket) => {
    _peopleOnline--;

    io.emit(events.PEOPLE_ONLINE, _peopleOnline);
  });

});

_bot.scheduleTalk(io, _messageCount);

console.log(`listening on port: ${PORT}`);
