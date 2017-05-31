'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

/*
const server = express()
//  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
*/

var app = express();
var http = require('http');
var server = http.createServer(app);
const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('Client connected');
  console.log("trying to send message to client");
  io.emit('general',{message: "it's me your server" });

  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('general',function(x){if(x!=0){console.log(x);}});
});


//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

app.set('port', PORT );


app.get('/',function(req,res){
  res.sendFile(INDEX);
});


app.get('/jquery.min.js',function(req,res){
 var f=path.join(__dirname, 'jquery.min.js');
 console.log("jquery.min.js requested");
 res.sendFile(f);
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
