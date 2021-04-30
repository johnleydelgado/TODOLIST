import PouchDB from 'pouchdb';
import { Database } from './index';
import MemoryStream from 'memorystream';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const serverInit = () => {


  io.on('connection', function (socket) {
    let dumpedString = '';
    let stream = new MemoryStream();
    stream.on('data', function (chunk) {
      dumpedString += chunk.toString();
    });

    Database.localDB
      .dump(stream)
      .then(function () {
        socket.emit('database', { pouchdb: dumpedString });
      })
      .catch(function (err) {
        console.log('oh no an error', err);
      });

      // Mobile Side
      socket.on('database', (data) => {
        Database.remoteDB
          .load(data.pouchdb)
          .then(function () {

            // done loading!
          })
          .catch(function (err) {
            // any possible errors
          });
      });

  });

  http.listen(4000, function () {
    console.log('listen 4000');
  });
};

export default serverInit;
