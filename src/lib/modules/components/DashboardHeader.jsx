import React from "react";
import { PersonCircle } from "react-bootstrap-icons";

import { headerStyles } from "./styles";

const DashboardHeader = () => {
  const classes = headerStyles();
  return (
    <div className={classes.headerContainer}>
      <div className={classes.content}>
        <span>Menu</span>
        <span className={classes.userInfo}>
          <PersonCircle />
        </span>
        <span>Bharath Srinivasan</span>
        <span>Sales Report</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
