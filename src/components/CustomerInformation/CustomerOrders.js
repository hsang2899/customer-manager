import { react } from "react";
import classes from "./customerOrders.module.css";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const CustomerOrders = (props) => {
  const customer = props.customer;
  let total = 0;
  const items = customer.orders.map((item, index) => {
    total += item.itemCost;
    return (
      <div key={index} className={classes.order}>
        <span className={classes.productName}>{item.productName}</span>
        <span className={classes.price}>${item.itemCost}</span>
      </div>
    );
  });
  return (
    <div className={classes.root}>
      <h2>Orders for Ted James</h2>
      <div className={classes.orders}>{items}</div>
      <hr className={classes.border} />
      <p className={classes.orderTotal}>{formatter.format(total)}</p>
    </div>
  );
};
