'use strict';

const uUId = require('node-uuid');
const pool = require('../lib/pool');

module.exports = function Client(socket) {
  this.socket = socket;
  this.id = uUId.v4();
  this.nickname = 'guest-' + pool.length;
};
