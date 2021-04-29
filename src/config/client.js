import ioClient from 'socket.io-client';
import PouchDB from 'pouchdb';
import { Database } from '.';


const clientConnection = (callback) => {
const socketClient = ioClient('http://192.168.100.69:4000');

  socketClient.on('connect', () => {});
  socketClient.on('database', (data) => {
    console.log(data.pouchdb);
    Database.remoteDB
      .load(data.pouchdb)
      .then(function () {
        Database.localDB
          .sync(Database.remoteDB)
          .on('complete', () => {
            console.log('Done Syncing !');
            callback('Done Syncing !');
          })
          .on('error', (err) => callback());
        // done loading!
      })
      .catch(function (err) {
        // any possible errors
      });
  });
};

export default clientConnection;
