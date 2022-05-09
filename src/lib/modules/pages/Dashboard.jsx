import React from "react";
import { grid } from "@material-ui/core";
import DashboardHeader from "../components/DashboardHeader";
import DashboardFilter from "../components/DashboardFilter";

const SalesDashboard = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardFilter />
    </>
  );
};

export default SalesDashboard;
