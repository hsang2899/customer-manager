import { react } from "react";
import maleAvatar from "../../images/male-avatar.png";
import femaleAvatar from "../../images/female-avatar.png";
import classes from "./customerDetails.module.css";

export const CustomerDetails = () => {
  return (
    <div className={classes.root}>
      <img src={maleAvatar} className={classes.avatar} />
      <h3 className={classes.fullName}>Ted James</h3>
      <p className={classes.address}>123 Anywhere</p>
      <p className={classes.address}>
        <span>Phoenix</span>
      </p>
    </div>
  );
};
