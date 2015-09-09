/// <reference path="typings/tsd.d.ts" />

import * as express from 'express';
import * as fs from 'fs';
import * as socketIo from 'socket.io';

const PORT: number = 8080;
const MESSAGE: string = 'msg';
const _colors: string[] = ["red", "orange", "steelblue", "brown", "tomato"];

const app = express();

const server = app.listen(PORT);
const io = socketIo(server);

app.use(express.static('./'));

app.get('/', (req, res) => {
  fs.createReadStream(__dirname + '/index.html')
    .pipe(res);
});

io.on('connection', (socket) => {
  let _rand: number = Math.floor(Math.random() * 100000);
  let _color: string = _colors[Math.random() * _colors.length];

  socket.on(MESSAGE, (info) => {
    let _message = {message: info, user: 'u' + _rand, sentAt: new Date().toString(), color: _color};

    io.emit(MESSAGE, _message);
  });
});

console.log(`listen port: ${PORT}`);
