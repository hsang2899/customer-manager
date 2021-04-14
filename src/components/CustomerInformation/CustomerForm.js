import { react } from "react";
import { Button, Form } from "react-bootstrap";

export const CustomerForm = () => {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>State</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <div>
      <Button variant="primary" type="button">
        Cancel
      </Button>
      <Button variant="primary" type="submit">
        Insert
      </Button>
      </div>
    </Form>
  );
};
