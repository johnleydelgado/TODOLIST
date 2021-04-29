//import liraries
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

// create a component
const index = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <Card
          style={{
            width: '100%',
            borderRadius: 15,
            backgroundColor: '#563d7c',
            marginBottom: 16,
          }}
          key={item._id}
        >
          <Card.Body>
            <Card.Title>{item._id}</Card.Title>
            <Card.Subtitle className="mb-2">{item.createdBy}</Card.Subtitle>
            <Card.Text>{item.todo}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

//make this component available to the app
export default index;
