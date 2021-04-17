import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContextProvider";
import customersClasses from "../Customers/customers.module.css";
import _ from "lodash";
import { Button, Col, Row } from "react-bootstrap";
import {
  GridFill,
  List,
  ListUl,
  PencilSquare,
  PersonFill,
  Plus,
  TagFill,
} from "react-bootstrap-icons";
import { CustomerForm } from "./CustomerForm";
import { CustomerDetails } from "./CustomerDetails";
import { CustomerOrders } from "./CustomerOrders";
import { useParams, Link } from "react-router-dom";

function getStatesApi(auth) {
  return axios({
    method: "GET",
    url: "http://localhost:8080/api/states",
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
}

function getCustomerApi(auth, id) {
  return axios({
    method: "GET",
    url: `http://localhost:8080/api/customers/${id}`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
}

const initialFormData = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: 0,
};

const tabs = ["Customer Details", "Customer Orders", "New Customer"];

export default function CustomerInformation() {
  const [auth, setAuth] = useContext(AuthContext);
  const [tab, setTab] = useState(tabs[0]);
  const [isRendering, setIsRendering] = useState(true);
  const [states, setStates] = useState([]);
  const { id } = useParams();
  const [customer, setCustomer] = useState(initialFormData);

  const getCustomer = (states) => {
    if (id) {
      getCustomerApi(auth, id)
        .then(function (response) {
          setCustomer(convertToCustomerForm(response.data, states));
          setIsRendering(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setTab(tabs[2]);
      setIsRendering(false);
    }
  };

  const getStates = () => {
    getStatesApi(auth)
      .then(function (response) {
        console.log("states day", response.data);
        getCustomer(response.data);
        setStates(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const convertToCustomerForm = (data, states) => {
    console.log(states);
    let index = _.findIndex(states, ["name", data.state.name]);
    console.log(index);
    return { ...data, state: index };
  };

  useEffect(() => {
    getStates();
  }, [id]);

  const getTabContent = () => {
    if (isRendering) return "";
    switch (tab) {
      case tabs[0]:
        return <CustomerDetails customer={customer} />;
      case tabs[1]:
        return <CustomerOrders customer={customer} />;
      case tabs[2]:
        return <CustomerForm customer={customer} states={states} />;
      default:
        return "Default";
    }
  };

  const currentTab = useMemo(() => getTabContent(), [isRendering, tab, states]);

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
              {id && (
                <>
                  <Button
                    onClick={() => setTab(tabs[0])}
                    className={`${customersClasses.buttonLink} ${
                      tabs[0] === tab ? customersClasses.buttonLinkActive : ""
                    }`}
                    variant="link"
                  >
                    <ListUl /> Customer Details
                  </Button>
                  <Button
                    onClick={() => setTab(tabs[1])}
                    className={`${customersClasses.buttonLink} ${
                      tabs[1] === tab ? customersClasses.buttonLinkActive : ""
                    }`}
                    variant="link"
                  >
                    <TagFill /> Customer Orders
                  </Button>
                </>
              )}
              <Button
                onClick={() => setTab(tabs[2])}
                className={`${customersClasses.buttonLink} ${
                  tabs[2] === tab ? customersClasses.buttonLinkActive : ""
                }`}
                variant="link"
              >
                {id ? (
                  <>
                    <PencilSquare /> Edit Customer
                  </>
                ) : (
                  <>
                    <Plus /> New Customer
                  </>
                )}
              </Button>
            </div>
          </div>
          <div>{currentTab}</div>

          <div className={customersClasses.footer}>
            <Link to="/customers">View all Customers</Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
