import PouchDB from 'pouchdb';
import replicationStream from 'pouchdb-replication-stream/dist/pouchdb.replication-stream';

PouchDB.plugin(replicationStream.plugin);
PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);
PouchDB.plugin(require('pouchdb-load'));

const localDB = new PouchDB('emrDb');
const remoteDB = new PouchDB('emrDbRemote');

export default { localDB, remoteDB };
