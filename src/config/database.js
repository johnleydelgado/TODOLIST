import PouchDB from 'pouchdb';

const localDB = new PouchDB('emrDb');
const remoteDB = new PouchDB('emrDbRemote');

export default { localDB, remoteDB };
