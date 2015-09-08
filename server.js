/// <reference path="typings/tsd.d.ts" />
var express = require('express');
var fs = require('fs');
var socketIo = require('socket.io');
var PORT = 8080;
var MESSAGE = 'msg';
var app = express();
var server = app.listen(PORT);
var io = socketIo(server);
app.use(express.static('./'));
app.get('/', function (req, res) {
    fs.createReadStream(__dirname + '/index.html')
        .pipe(res);
});
io.on('connection', function (socket) {
    socket.on(MESSAGE, function (info) {
        var _message = { message: info, user: '_eric', sentAt: new Date().toString() };
        socket.emit(MESSAGE, _message);
    });
});
console.log("listen port: " + PORT);
