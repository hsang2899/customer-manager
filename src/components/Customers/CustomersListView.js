import React from "react";
import { Link } from "react-router-dom";
import maleAvatar from "../../images/male-avatar.png";
import femaleAvatar from "../../images/female-avatar.png";
import _ from "lodash";
import { Table } from "react-bootstrap";
import classes from "./customersListView.module.css";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const CustomersListView = (props) => {
  const customerCells = props.customersList.map((row) => {
    const avatar = row.gender === "male" ? maleAvatar : femaleAvatar;
    const orderTotal = _.sumBy(row.orders, (o) => o.itemCost);
    return (
      <tr key={row.id}>
        <td>
          <img src={avatar} className={classes.avatar} />
        </td>
        <td align="right">{row.firstName}</td>
        <td align="right">{row.lastName}</td>
        <td align="right">{row.address}</td>
        <td align="right">{row.city}</td>
        <td align="right">{row.state?.name}</td>
        <td align="right">{formatter.format(orderTotal)}</td>
        <td align="right">
          <Link to={`/customers/${row.id}`}>View orders</Link>
        </td>
      </tr>
    );
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th align="right">First Name</th>
          <th align="right">Last Name</th>
          <th align="right">Address</th>
          <th align="right">City</th>
          <th align="right">State</th>
          <th align="right">Order Total</th>
          <th align="right"></th>
        </tr>
      </thead>
      <tbody>{customerCells}</tbody>
    </Table>
  );
};
