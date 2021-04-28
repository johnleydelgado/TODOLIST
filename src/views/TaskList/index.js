import React, { useEffect, useState } from 'react';
import PouchDB from 'pouchdb';
import PouchStreamServer from 'pouch-stream-server';
import { NavBar, TodoListCard, TodoListModal } from '../../components';
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
import ioClient from 'socket.io-client';
PouchDB.plugin(require('pouchdb-load'));

const socketClient = ioClient('http://192.168.100.69:4000');

function index(props) {
  const [showMTL, setShowMTL] = useState(false);
  const [todoData, setTodoData] = useState({});

  const handleClose2 = () => setShowMTL(false);
  const handleShow2 = () => setShowMTL(true);

  var localDB = new PouchDB('someLocalDB');

  localDB
  .allDocs({ include_docs: true, descending: true })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

  useEffect(() => {
    io.on('connection', function (socket) {

    });

    http.listen(4000, function () {
      console.log('listen 4000');
    });
  }, []);

  useEffect(() => {
    socketClient.on('connect', () => {
      // either with send()
      // socketClient.send('Hello there mac');
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
