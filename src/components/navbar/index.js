//import liraries
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faPlus } from '@fortawesome/free-solid-svg-icons';
import LANScanner from 'lanscanner';
import find from 'local-devices';
import {
  Modal,
  ModalDialog,
  Button,
  Row,
  Col,
  Container,
  Navbar,
  NavbarBrand,
  Form,
} from 'react-bootstrap';
import { TodoListModal } from '..';
const ModalNetworkList = {};

// create a component
const index = ({ handleShowTodo }) => {
  const find = require('local-devices');
  const [ipList, setIpList] = useState([]);
  const [showMN, setShowMN] = useState(false);

  const handleClose = () => setShowMN(false);
  const handleShow = () => setShowMN(true);

  useEffect(() => {
    setIpList([]);
    find().then((devices) => {
      setIpList(devices);
    });
  }, []);

  const ModalNetworkList = () => {
    return (
      <>
        <Modal
          show={showMN}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-secondary">
              LIST OF NETWORKS
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-secondary">
            <Container>
              {ipList.map((item) => {
                return (
                  <Row>
                    <Col xs={6}>
                      <p>{item.ip}</p>
                    </Col>
                    <Col md="auto">
                      <p>connected</p>
                    </Col>
                    <Col xs lg="2">
                      <div
                        style={{
                          height: 20,
                          width: 20,
                          borderRadius: 20,
                          backgroundColor: 'green',
                        }}
                      ></div>
                    </Col>
                  </Row>
                );
              })}
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">OK</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Container fluid style={{ backgroundColor: '#563d7c' }}>
        <Navbar variant="dark">
          <Col lg={5}>
            <FontAwesomeIcon
              icon={faNetworkWired}
              size="lg"
              className="cursor-pointer"
              onClick={() => handleShow()}
            />
          </Col>
          <Col lg={2}>
            <Navbar.Brand>TODO LIST</Navbar.Brand>
          </Col>
          <Col lg={5} style={{ textAlign: 'right' }}>
            <FontAwesomeIcon
              icon={faPlus}
              size="lg"
              className="cursor-pointer"
              onClick={() => handleShowTodo()}
            />
          </Col>
        </Navbar>
        <ModalNetworkList />
      </Container>
    </>
  );
};

export default index;
