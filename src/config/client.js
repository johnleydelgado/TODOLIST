import ioClient from 'socket.io-client';
import { Database } from '.';

const socketClient = ioClient('http://192.168.100.15:4000');

const clientConnection = (callback) => {
  socketClient.on('connect', () => {});
  socketClient.on('database', (data) => {
    // console.log(data.pouchdb);
    Database.remoteDB
      .load(data.pouchdb)
      .then(function () {
        localDB
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
