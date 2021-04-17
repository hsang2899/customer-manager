import axios from "axios";
import { react, useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../Context/AuthContextProvider";
import classes from "./customerForm.module.css";

async function createCustomer(auth, data) {
  return axios({
    method: "POST",
    url: "http://localhost:8080/api/customers",
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    data: data,
  });
}

async function editCustomer(auth, data) {
  return axios({
    method: "PUT",
    url: `http://localhost:8080/api/customers/${data.id}`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    data: data,
  });
}

async function submitCustomer(auth, data) {
  if (data.id) {
    return editCustomer(auth, data);
  } else {
    return createCustomer(auth, data);
  }
}

export const CustomerForm = (props) => {
  const [auth] = useContext(AuthContext);
  const states = props.states;
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({ ...props.customer });
  console.log(formData);

  const options = states.map((value, i) => {
    return (
      <option key={i} value={i}>
        {value.name}
      </option>
    );
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(states);
    console.log(formData.state);
    console.log(states[formData.state].abbreviation);
    const stateObj = {
      abbreviation: states[formData.state].abbreviation,
      name: states[formData.state].name,
    };

    const submitForm = {
      ...formData,
      state: stateObj,
    };

    setIsSubmit(true);

    if (!isSubmit)
      submitCustomer(auth, submitForm)
        .then(function (response) {
          setIsSubmit(false);
          swal({
            title: "Successfully",
            icon: "success",
            button: false,
            text: "Save customer succes1",
            timer: 1500,
          });
          history.push("/customers");
        })
        .catch(function (error) {
          setIsSubmit(false);
        });
  };

  const getTextSaveButton = () => {
    return formData.id ? "Update" : "Save";
  };

  const getTextSavingButton = () => {
    return formData.id ? "Updating..." : "Saving...";
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={isSubmit}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={isSubmit}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={isSubmit}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={isSubmit}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>State</Form.Label>
        <Form.Control
          as="select"
          name="state"
          value={formData.state}
          onChange={handleChange}
          disabled={isSubmit}
        >
          {options}
        </Form.Control>
      </Form.Group>
      <div className={classes.buttonGroup}>
        {formData.id && (
          <Button
            className={classes.deleteButton}
            variant="danger"
            type="button"
            disabled={isSubmit}
          >
            Delete
          </Button>
        )}
        <Button
          className={classes.cancelButton}
          variant="light"
          type="button"
          disabled={isSubmit}
          onClick={() => history.push("/customers")}
        >
          Cancel
        </Button>
        <Button variant="success" type="submit" disabled={isSubmit}>
          {isSubmit ? getTextSavingButton() : getTextSaveButton()}
        </Button>
      </div>
    </Form>
  );
};
