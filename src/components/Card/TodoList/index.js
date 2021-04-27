//import liraries
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

// create a component
const index = () => {
  return (
    <Card
      style={{ width: '100%', borderRadius: 15, backgroundColor: '#563d7c' }}
    >
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

//make this component available to the app
export default index;
