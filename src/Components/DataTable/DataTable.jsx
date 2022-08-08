import React from "react";
import { MDBDataTable } from "mdbreact";
import { CircularProgress, Container, Paper, Typography } from "@mui/material";

const DatatablePage = ({ data, isLoaded }) => {
  console.log("data table", data);
  return isLoaded == false ? (
    <MDBDataTable compact hover responsive data={data} />
  ) : (
    <CircularProgress />
  );
};

export default DatatablePage;
