//import liraries
import React, { useState } from 'react';
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

const index = ({ show2, setShow2, submitHandler, setData, todoData }) => {
  const FormTextInput = ({ title, placeholder, onChangeText, value }) => {
    return (
      <Form.Group>
        <Form.Label>{title}</Form.Label>
        <Form.Control
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChangeText}
        />
      </Form.Group>
    );
  };

  return (
    <>
      <Modal
        show={show2}
        onHide={() => setShow2(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-secondary">CREATE TODO LIST</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-secondary">
          <Container>
            <Form>
              <FormTextInput
                title="ID"
                placeholder="Enter Id"
                value={todoData.id}
                onChangeText={(txt) =>
                  setData((prevState) => ({
                    ...prevState,
                    id: txt.target.value,
                  }))
                }
              />
              <FormTextInput
                title="Name"
                placeholder="Enter name"
                value={todoData.createdBy}
                onChangeText={(txt) =>
                  setData((prevState) => ({
                    ...prevState,
                    createdBy: txt.target.value,
                  }))
                }
              />
              <FormTextInput
                title="Task"
                placeholder="Enter task"
                value={todoData.todo}
                onChangeText={(txt) =>
                  setData((prevState) => ({
                    ...prevState,
                    todo: txt.target.value,
                  }))
                }
              />
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow2(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            SUBMIT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//make this component available to the app
export default index;
