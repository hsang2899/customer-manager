import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContextProvider";
import customersClasses from "../Customers/customers.module.css";
import _ from "lodash";
import { Button, Col, Row } from "react-bootstrap";
import { GridFill, List, PersonFill, Plus } from "react-bootstrap-icons";
import { CustomerForm } from "./CustomerForm";
import { CustomerDetails } from "./CustomerDetails";
import { CustomerOrders } from "./CustomerOrders";

async function getCustomers(auth) {
  console.log(auth);
  return axios({
    method: "GET",
    url: "http://localhost:8080/api/customers",
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
}

const tabs = ["Customer Details", "Customer Orders", "New Customer"];

export default function CustomerInformation() {
  const [auth] = useContext(AuthContext);
  const [tab, setTab] = useState(tabs[0]);

  useEffect(() => {}, []);

  const currentTab = () => {
    switch (tab) {
      case tabs[0]:
        return <CustomerDetails />;
      case tabs[1]:
        return <CustomerOrders />;
      case tabs[2]:
        return <CustomerForm />;
      default:
        return "Default";
    }
  };

  return (
    <div className={customersClasses.root}>
      <Row>
        <Col xs="12" md="7">
          <div className={customersClasses.pageHeader}>
            <h1>
              <PersonFill /> Customer Information
            </h1>
          </div>

          <div className={customersClasses.tabParent}>
            <div className={customersClasses.tabHeader}>
              <Button
                onClick={() => setTab(tabs[0])}
                className={`${customersClasses.buttonLink} ${
                  tabs[0] === tab ? customersClasses.buttonLinkActive : ""
                }`}
                variant="link"
              >
                <GridFill /> Customer Details
              </Button>
              <Button
                onClick={() => setTab(tabs[1])}
                className={`${customersClasses.buttonLink} ${
                  tabs[1] === tab ? customersClasses.buttonLinkActive : ""
                }`}
                variant="link"
              >
                <List /> Customer Orders
              </Button>
              <Button
                onClick={() => setTab(tabs[2])}
                className={`${customersClasses.buttonLink} ${
                  tabs[2] === tab ? customersClasses.buttonLinkActive : ""
                }`}
                variant="link"
              >
                <Plus /> New Customer
              </Button>
            </div>
          </div>
          <div>{currentTab()}</div>
        </Col>
      </Row>
    </div>
  );
}
