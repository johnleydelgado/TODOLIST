import React, { useEffect, useState } from 'react';
import PouchDB from 'pouchdb';
import replicationStream from 'pouchdb-replication-stream/dist/pouchdb.replication-stream';
import MemoryStream from 'memorystream';
import { NavBar, TodoListCard, TodoListModal } from '../../components';
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
import ioClient from 'socket.io-client';
PouchDB.plugin(require('pouchdb-load'));
import fs from 'fs';

const socketClient = ioClient('http://192.168.100.15:4000');

function index(props) {
  const [showMTL, setShowMTL] = useState(false);
  const [todoData, setTodoData] = useState({});

  const handleClose2 = () => setShowMTL(false);
  const handleShow2 = () => setShowMTL(true);

  PouchDB.plugin(replicationStream.plugin);
  PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);

  var dumpedString = '';
  var stream = new MemoryStream();
  stream.on('data', function (chunk) {
    dumpedString += chunk.toString();
  });

  var localDB = new PouchDB('someLocalDB');
  const ws = fs.createWriteStream('someLocalDB/someLocal.txt');
  const rs = fs.createReadStream('someLocalDB/someLocal.txt');

  localDB
  .allDocs({ include_docs: true, descending: true })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

  //Server
  useEffect(() => {
    io.on('connection', function (socket) {
      localDB
        .dump(stream)
        .then(function () {
          socket.emit('database', { pouchdb: dumpedString });
        })
        .catch(function (err) {
          console.log('oh no an error', err);
        });
    });

    http.listen(4000, function () {
      console.log('listen 4000');
    });
  }, []);

  // Client
  useEffect(() => {
    socketClient.on('connect', () => {
    });
    socketClient.on('database',(data) => {
      // console.log(data.pouchdb);
      localDB.load(data.pouchdb).then(function () {
        console.log('done');
        // done loading!
      }).catch(function (err) {
        // any possible errors
      });
    })
  }, []);

  const submitHandler = () => {
    // setFetching(false);
    localDB
      .put({
        _id: todoData.id,
        createdBy: todoData.createdBy,
        todo: todoData.todo,
      })
      .then(function (response) {
        setShowMTL(false);
        setTodoData({});
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <NavBar handleShowTodo={handleShow2} />
      <div
        class="jumbotron centerAlignment"
        style={{ height: '100%', backgroundColor: 'white' }}
      >
        <TodoListCard />
        <TodoListModal
          show2={showMTL}
          setShow2={setShowMTL}
          setData={setTodoData}
          todoData={todoData}
          submitHandler={() => submitHandler()}
        />
      </div>
    </>
  );
}

export default index;
