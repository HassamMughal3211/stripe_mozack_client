import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { url } from "../../baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { lightBackground, white } from "../../Assets/Theme/ThemeColors";
import logo from "../../Assets/images/companylogo.png";
import CustomizedSnackbars from "../../Components/SnackBar/SnackBar";
import { Error } from "@mui/icons-material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mozack.com/">
        mozack.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const user = useSelector((state) => state.user.data);

  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsClicked(true);
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get("email"),
      password: data.get("password"),
    };
    await axios
      .post(`${url}/auth/signin`, credentials)
      .then((data) => {
        console.log("user data", data.data);
        login(data.data, dispatch);
        if (data.data.success) {
          setIsOpen(true);
          setMessage("Login Successful!");
          setSeverity("success");

          setTimeout(() => {
            setIsOpen(false);
            setIsClicked(false);
            navigate("/transaction/list");
          }, 3000);
        } else {
          setIsClicked(false);
          setIsOpen(true);
          setMessage(data.data.message);
          setSeverity("error");
          setTimeout(() => {
            setIsOpen(false);
          }, 3000);
        }
      })
      .catch((error) => {
        setIsClicked(false);
        setIsOpen(true);
        setMessage(error.message);
        setSeverity("error");
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ height: "100vh" }}>
        <CssBaseline />
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid>
            <Grid xs={12} sx={{ p: 2, mb: 2 }}>
              <img src={logo} style={{ height: "30px", width: "200px" }} />
            </Grid>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              // noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  background: `${lightBackground}`,
                  color: `${white}`,
                }}
                sx={{ mt: 3, mb: 2 }}
              >
                {isClicked ? (
                  <span>
                    {" "}
                    <CircularProgress
                      style={{
                        color: `${white}`,
                        height: "20px",
                        width: "20px",
                      }}
                    />
                  </span>
                ) : (
                  " Sign In"
                )}
              </Button>
              <Copyright sx={{ mt: 8 }} />
            </Box>
          </Grid>
        </Box>
        <CustomizedSnackbars
          isOpen={isOpen}
          severity={severity}
          message={message}
        />
      </Container>
    </ThemeProvider>
  );
}
