import React, { useEffect, useState } from 'react';
import PouchDB from 'pouchdb';
import { NavBar, TodoListCard, TodoListModal } from '../../components';

import fs from 'fs';
import { Server, Client, Database } from '../../config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
function index(props) {
  const [showMTL, setShowMTL] = useState(false);
  const [todoData, setTodoData] = useState({});

  const handleClose2 = () => setShowMTL(false);
  const handleShow2 = () => setShowMTL(true);

  const [dataDb, setDataDb] = useState([]);

  useEffect(() => {
    Server();
    setDataDb([]);
    Database.localDB
      .allDocs({ include_docs: true, descending: true })
      .then((result) =>
        result.rows.forEach((item) => {
          setDataDb((prevArr) => [...prevArr, item.doc]);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   Client();
  //   getData();
  // }, []);

  const clientSyncing = () => {
    Client((result) => {
      alert(result);
      if (result) {
        setDataDb([]);
        getData();
      } else {
        alert('Error');
      }
    });

    // For mobile
    Database.localDB
    .sync(Database.remoteDB)
    .on('complete', () => {
      getData();
    })
    .on('error', (err) => console.log('err',err));
  };

  const getData = () => {
    setDataDb([]);
    Database.localDB
      .allDocs({ include_docs: true, descending: true })
      .then((result) =>
        result.rows.forEach((item) => {
          setDataDb((prevArr) => [...prevArr, item.doc]);
        })
      )
      .catch((err) => console.log(err));
  };

  const submitHandler = () => {
    // setFetching(false);
    Database.localDB
      .put({
        _id: todoData.id,
        createdBy: todoData.createdBy,
        todo: todoData.todo,
      })
      .then(function (response) {
        setShowMTL(false);
        setTodoData({});
        getData();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <NavBar handleShowTodo={handleShow2} />
      <div
        className="jumbotron centerAlignment"
        style={{ height: '100%', backgroundColor: 'white' }}
      >
        <TodoListCard data={dataDb} />
        <TodoListModal
          show2={showMTL}
          setShow2={setShowMTL}
          setData={setTodoData}
          todoData={todoData}
          submitHandler={() => submitHandler()}
        />
        <div
          style={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            height: 42,
            width: 42,
            background: '#563d7c',
            borderRadius: 40,
            textAlign: 'center',
            paddingTop: 8,
          }}
          className="cursor-pointer"
          onClick={clientSyncing}
        >
          <FontAwesomeIcon icon={faSync} size="lg" />
        </div>
      </div>
    </>
  );
}

export default index;
