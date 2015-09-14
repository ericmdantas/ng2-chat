/// <reference path="typings/tsd.d.ts" />

import * as express from 'express';
import * as fs from 'fs';
import * as socketIo from 'socket.io';

const PORT: number = 8080;
const MESSAGE: string = 'msg';
const MESSAGE_COUNT: string = 'msg_count';
const PEOPLE_ONLINE: string = 'people_online';
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
  _peopleOnline++;

  io.emit(PEOPLE_ONLINE, _peopleOnline)

  socket.on(MESSAGE, (data: {info: string, user: string}) => {

    _messageCount ++;

    let _message = {message: data.info, user: data.user, sentAt: new Date().toString(), color: undefined};

    io.emit(MESSAGE, _message);
    io.emit(MESSAGE_COUNT, _messageCount);
  });

  socket.on('disconnect', (socket) => {
    _peopleOnline--;

    io.emit(PEOPLE_ONLINE, _peopleOnline);
  });
});

console.log(`listen port: ${PORT}`);
