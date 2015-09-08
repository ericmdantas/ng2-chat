/// <reference path="typings/tsd.d.ts" />

import * as express from 'express';
import * as fs from 'fs';
import * as socketIo from 'socket.io';

const PORT: number = 8080;
const MESSAGE: string = 'msg';
const app = express();
const server = app.listen(PORT);
const io = socketIo(server);

app.use(express.static('./'));

app.get('/', (req, res) => {
  fs.createReadStream(__dirname + '/index.html')
    .pipe(res);
});

io.on('connection', (socket) => {
  socket.on(MESSAGE, (info) => {
    let _message = {message: info, user: '_eric', sentAt: new Date().toString()};

    socket.emit(MESSAGE, _message);
  });
});

console.log(`listen port: ${PORT}`);
