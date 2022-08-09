import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  brandName,
  lightBackground,
  navbar,
} from "../../Assets/Theme/ThemeColors";
import PopOver from "../Popover/PopOver";

const Navbar = () => {
  const user = useSelector((state) => state.user.data);
  console.log("username", user.data.user.username);
  const username = user.data.user.username;
  return (
    <Grid
      container
      sx={12}
      style={{
        height: "6vh",
        color: "white",
        width: "100vw",
        background: `${lightBackground}`,
      }}
    >
      <Grid
        md={3}
        xs={6}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">{brandName}</Typography>
      </Grid>
      <Grid md={8} xs={0}></Grid>
      <Grid md={1} xs={6}>
        <span
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PopOver name={username} />
        </span>
      </Grid>
    </Grid>
  );
};

export default Navbar;
