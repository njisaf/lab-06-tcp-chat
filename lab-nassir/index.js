'use strict';

//node modules
const net = require('net');
const EE = require('events');
//npm modules
//app modules
const Client = require('./model/client');
const pool = require('./lib/pool');
const wacks = require('./lib/wacks');
//env variables
const PORT = process.env.PORT || 3000;
//module constants
const ee = new EE();
const server = net.createServer();
//module logic


server.on('connection', function(socket) {
  var client = new Client(socket);
  pool.push(client);
  ee.emit('welcome', client);

  socket.on('data', function(data) {
    console.log('data detected: ' + data);
    const command = data.toString().trim();
    if (command.startsWith('\\')) {
      wacks(command.split(' ').slice(0, 1), client, data.toString().split(' ').slice(1).join(' '), function(err, wackResponse) {
        if (err) throw console.error('ERROR ERROR: wacks error');
        wackResponse;
      });
      return;
    }
  });

  socket.on('close', function() {
    var user = client.nickname;
    pool.forEach((c) => {
      if (c.nickname === user) {
        var pos = pool.indexOf(c);
        pool.splice(pos, 1);
        pool.forEach((c) => {
          c.socket.write(`${user} has left the chat.`);
        });
      }
    });
  });

  socket.on('error', err => {
    console.error('ERROR! There has been an error: ' + err);
  });

});

ee.on('welcome', function(client){
  client.socket.write('Welcome ' + client.nickname + '!\n');
});

server.listen(PORT, function() {
  console.log('server runnning on port', PORT);
});
