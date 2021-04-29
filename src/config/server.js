import PouchDB from 'pouchdb';
import { Database } from './index';
import replicationStream from 'pouchdb-replication-stream/dist/pouchdb.replication-stream';
import MemoryStream from 'memorystream';
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

PouchDB.plugin(replicationStream.plugin);
PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);

var dumpedString = '';
var stream = new MemoryStream();
stream.on('data', function (chunk) {
  dumpedString += chunk.toString();
});

const serverInit = () => {
  io.on('connection', function (socket) {
    Database.localDB
      .dump(stream)
      .then(function () {
        console.log('dump', dumpedString);
        socket.emit('database', { pouchdb: dumpedString });
      })
      .catch(function (err) {
        console.log('oh no an error', err);
      });
  });

  http.listen(4000, function () {
    console.log('listen 4000');
  });
};

export default serverInit;
