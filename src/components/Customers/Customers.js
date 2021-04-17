import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { CustomersCardView } from "./CustomersCardView";
import { CustomersListView } from "./CustomersListView";
import CustomizedInputBase from "../Input/CustomizedInputBase";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContextProvider";
import classes from "./customers.module.css";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { GridFill, List, Plus } from "react-bootstrap-icons";
import { PaginationCustom } from "../Pagination/PaginationCustom";
import { Redirect } from "react-router-dom";

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

const tabs = ["CardView", "ListView", "New Customer"];

export default function Customers() {
  const [auth] = useContext(AuthContext);
  const pageSize = auth.numberPerPage;
  console.log(auth.numberPerPage);
  const [tab, setTab] = useState(tabs[0]);
  const [customersList, setCustomersList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  const handleChangePaging = (value) => {
    setPage(value);
  };

  const handleChangeSearchText = (value) => {
    setPage(1);
    setSearchText(value);
  };

  const paginationDescription = () => {
    let total = totalItems;
    let first = (page - 1) * pageSize + 1;
    let last = page == pageCount ? first -1 + (total % pageSize) : page * pageSize;
    return `Shows ${first} - ${last} of ${total}`;
  };

  const fillData = (list) => {
    
    const filtered = _.filter(
      list,
      (u) =>
        u.firstName.includes(searchText) ||
        u.lastName.includes(searchText) ||
        u.address.includes(searchText) ||
        u.state.name.includes(searchText)
    );
    const paged = _.drop(filtered, (page - 1) * pageSize).slice(0, pageSize);
    let pageLength = filtered.length;
    let pageCount = Math.floor(pageLength / pageSize);
    setPageCount(
      pageLength === 0 || pageLength % pageSize !== 0
        ? pageCount + 1
        : pageCount
    );
    setTotalItems(pageLength);
    setCustomersList(paged);
  };

  useEffect(() => {
    getCustomers(auth)
      .then(function (response) {
        fillData(response.data);
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  }, [page, searchText]);

  const currentTab = useMemo(() => {
    switch (tab) {
      case tabs[0]:
        return <CustomersCardView customersList={customersList} />;
      case tabs[1]:
        return <CustomersListView customersList={customersList} />;
      case tabs[2]:
        return <Redirect to="/customers/create" />;
      default:
        return <CustomersCardView customersList={customersList} />;
    }
  }, [tab, customersList]);

  return (
    <div className={classes.root}>
      <div className={classes.tabParent}>
        <div className={classes.tabHeader}>
          <Button
            onClick={() => setTab(tabs[0])}
            className={`${classes.buttonLink} ${
              tabs[0] === tab ? classes.buttonLinkActive : ""
            }`}
            variant="link"
          >
            <GridFill /> Card View
          </Button>
          <Button
            onClick={() => setTab(tabs[1])}
            className={`${classes.buttonLink} ${
              tabs[1] === tab ? classes.buttonLinkActive : ""
            }`}
            variant="link"
          >
            <List /> List View
          </Button>
          <Button
            onClick={() => setTab(tabs[2])}
            className={`${classes.buttonLink} ${
              tabs[2] === tab ? classes.buttonLinkActive : ""
            }`}
            variant="link"
          >
            <Plus /> New Customer
          </Button>
        </div>
        <CustomizedInputBase
          className={classes.searchBar}
          handleSubmit={handleChangeSearchText}
        />
      </div>
      <div>{currentTab}</div>
      <div className={classes.paginationParent}>
        <PaginationCustom
          count={pageCount}
          page={page}
          onChange={handleChangePaging}
        />
        <div>{paginationDescription()}</div>
      </div>
    </div>
  );
}
