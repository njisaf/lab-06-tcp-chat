![cf](https://i.imgur.com/7v5ASc8.png) 401d10 Lab 06
======

## TCP Chat Server

This program is a simple chat server built on top of TCP, using the NODE.js 'net' module.

# Server Instructions

* Start the server from the command line using `node index.js` from the home directory.
* Default PORT is 3000. To use a custom port, start the server with `node index.js PORT=` and a port number.
* Connect to the server from a shell instance using `telnet localhost 3000`, where 3000 is the PORT number. Replace `localhost` with a server IP if connecting remotely.

# Chat Instructions

The following commands work in chat. Replace text in [square brackets] with whatever you please:

* `\nick [nickname]` Changes your nickname.
* `\all [message]` Broadcasts to all users connected to the server.
* `\dm [nickname] [message]` Direct messages the user with the nickname entered.
