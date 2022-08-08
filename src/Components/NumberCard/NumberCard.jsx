import * as React from "react";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { lightBackground, lightText } from "../../Assets/Theme/ThemeColors";

function preventDefault(event) {
  event.preventDefault();
}

export default function NumberCard({
  title,
  amount,
  date,
  linkName,
  sheetLink,
}) {
  console.log(title, amount);
  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <React.Fragment style={{ display: "flex", alignItems: "center" }}>
        <Typography
          component="h3"
          variant="h5"
          color={lightText}
          sx={{ flex: 1}}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          component="p"
          variant="h3"
          color={lightBackground}
          sx={{ flex: 1}}
        >
          {amount}
        </Typography>
        <Typography color="text.secondary" variant="h5" sx={{ flex: 1, m: 2 }}>
          {date}
        </Typography>
        <div sx={{ flex: 1}}>
          <Link
            color="primary"
            to={sheetLink}
            //   onClick={preventDefault}
          >
            {linkName}
          </Link>
        </div>
      </React.Fragment>
    </Paper>
  );
}
