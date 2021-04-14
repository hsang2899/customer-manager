import { react } from "react";
import classes from "./customerOrders.module.css";

export const CustomerOrders = () => {
  return (
    <div className={classes.root}>
      <h2>Orders for Ted James</h2>
      <div className={classes.orders}>
        <div className={classes.order}>
          <span className={classes.productName}>Basket Ball</span>
          <span className={classes.price}>$7.99</span>
        </div>
        <div className={classes.order}>
          <span className={classes.productName}>Basket Ball</span>
          <span className={classes.price}>$7.99</span>
        </div>
      </div>
      <hr className={classes.border} />
      <p className={classes.orderTotal}>$207.98</p>
    </div>
  );
};
