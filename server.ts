/// <reference path="typings/tsd.d.ts" />

import * as express from 'express';
import * as fs from 'fs';
import * as socketIo from 'socket.io';

const PORT: number = 8080;
const MESSAGE: string = 'msg';
const MESSAGE_COUNT: string = 'msg_count';
const PEOPLE_ONLINE: string = 'people_online';
const COLORS: string[] = ["red", "orange", "steelblue", "brown", "tomato"];
const app = express();
const server = app.listen(PORT);
const io = socketIo(server);

let _peopleOnline: number = 0;
let _messageCount: number = 0;

app.use(express.static('./'));

app.get('/', (req, res) => {
  fs.createReadStream(__dirname + '/index.html')
    .pipe(res);
});

io.on('connection', (socket) => {
  let _rand: number = Math.floor(Math.random() * 100000);
  let _color: string = COLORS[Math.random() * COLORS.length];

  _peopleOnline++;

  io.emit(PEOPLE_ONLINE, _peopleOnline)

  socket.on(MESSAGE, (info) => {

    _messageCount ++;

    let _message = {message: info, user: 'u' + _rand, sentAt: new Date().toString(), color: _color};

    io.emit(MESSAGE, _message);
    io.emit(MESSAGE_COUNT, _messageCount);
  });

  socket.on('disconnect', (socket) => {
    _peopleOnline--;

    io.emit(PEOPLE_ONLINE, _peopleOnline);
  });
});



console.log(`listen port: ${PORT}`);
