'use strict';

//node modules
const EE = require('events');
//app modules
const pool = require('./pool');
//module constants
const ee = new EE();

module.exports = function wacks(command, client, string, callback) {
  console.log('wacks triggered', command);
  console.log('wacks string', string);

  ee.emit(command[0], client, string);
  callback;
};

ee.on('\\nick', function(client, string) {
  var oldNick = client.nickname;
  client.nickname = string;
  console.log('nick new nickname', client.nickname);
  var newNickname = client.nickname;
  client.socket.write(`Nickname changed to ${newNickname}\n`);
  pool.forEach((c) => {
    c.socket.write(`${oldNick} changed their nickname to: ` + newNickname);
  return;
});

ee.on('\\all', function(client, string) {
  var printNickname = client.nickname;
  console.log('pool is ', pool);
  console.log('string is ', string);
  pool.forEach((c) => {
    c.socket.write(`${printNickname} says: ` + string);
  });
  return;
});

ee.on('\\dm', function(client, string) {
  var speaker = client.nickname;
  var addressee = string.split(' ').shift();
  console.log('dm addressee', addressee);
  var message = string.split(' ').slice(1).join(' ');
  console.log('dm message', message);
  pool.forEach((c) => {
    if (c.nickname === addressee + '\r\n') {
      c.socket.write(`(${speaker} says to you): ` + message);
    }
  });
  return;
});
