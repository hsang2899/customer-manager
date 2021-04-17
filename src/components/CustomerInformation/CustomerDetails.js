import { react } from "react";
import maleAvatar from "../../images/male-avatar.png";
import femaleAvatar from "../../images/female-avatar.png";
import classes from "./customerDetails.module.css";

export const CustomerDetails = (props) => {
  const customer = props.customer;
  const avatar = props.gender === "male" ? maleAvatar : femaleAvatar;
  return (
    <div className={classes.root}>
      <img src={avatar} className={classes.avatar} />
      <h3 className={classes.fullName}>
        {customer.firstName} {customer.lastName}
      </h3>
      <p className={classes.address}>{customer.address}</p>
      <p className={classes.address}>
        <span>{customer.city}</span>, <span>{customer.state.name}</span>
      </p>
    </div>
  );
};
