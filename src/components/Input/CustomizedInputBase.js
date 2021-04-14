import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

export default function CustomizedInputBase(props) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label style={{margin:"0"}}>Filter</Form.Label>
        <Form.Control
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search customers"
        />
      </Form.Group>
    </Form>
  );
}
