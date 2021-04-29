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
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  value={todoData.id}
                  placeholder="Enter Id"
                  onChange={(txt) =>
                    setData((prevState) => ({
                      ...prevState,
                      id: txt.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Created By</Form.Label>
                <Form.Control
                  type="text"
                  value={todoData.createdBy}
                  placeholder="Enter Id"
                  onChange={(txt) =>
                    setData((prevState) => ({
                      ...prevState,
                      createdBy: txt.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Enter task</Form.Label>
                <Form.Control
                  type="text"
                  value={todoData.todo}
                  placeholder="Enter Todo"
                  onChange={(txt) =>
                    setData((prevState) => ({
                      ...prevState,
                      todo: txt.target.value,
                    }))
                  }
                />
              </Form.Group>
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
