import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { url } from "../../baseUrl";
import { useSelector } from "react-redux";
import axios from "axios";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  brandUrl,
  button,
  cardBackground,
  invoiceCard,
  lightBackground,
  lightText,
  mainBackgound,
  navbar,
  navbarText,
  white,
} from "../../Assets/Theme/ThemeColors";
import CustomizedSnackbars from "../../Components/SnackBar/SnackBar";
import isAlpha from "validator/lib/isAlpha";
import isEmail from "validator/lib/isEmail";
import Navbar from "../../Components/Navbar/Navbar";
import { Badge, Descriptions } from "antd";
import CheckoutForm from "../../Components/StripeCardForm/CheckOutForm";
import "./invoice.css";
import StripeCardForm from "../../Components/StripeCardForm/StripeCardForm";
import logo from "../../Assets/images/logo.png";
import stripeBadge from "../../Assets/images/stripebadge.png";
import comoo from "../../Assets/images/comoo.png";
import masterCard from "../../Assets/images/masterCard.png";
import norton from "../../Assets/images/norton.png";
import visa from "../../Assets/images/visa.png";
import ssl from "../../Assets/images/ssl.png";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const InvoicePage = () => {
  let { id } = useParams();
  let param = id.split("_");
  const state = useSelector((state) => state.user.data);

  const [data, setData] = useState();
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  // const state = useSelector((state) => state.user.data);

  let invoiceId = param[0];
  console.log("invoiceId", invoiceId);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  console.log("first", formatter.format(2500));
  // formatter.format(2500); /* $2,500.00 */

  useEffect(() => {
    getSpecificTransaction();
  }, []);

  const getSpecificTransaction = async () => {
    setIsLoading(false);
    await axios
      .post(`${url}/transactions/getSpecificTransaction`, {
        _id: invoiceId,
      })
      .then((response) => {
        console.log("response", response.data.data[0]);
        setData(response.data.data[0]);
        console.log("key", response.data.key.publishKey);
        setKey(response.data.key.publishKey);

        if (response.data.data[0].paymentStatus) {
          setIsPaid(true);
        } else {
          setIsPaid(false);
        }

        setIsLoading(true);

        // if (response.data.success) {
        //   // setIsReadOnly(true);
        //   // let ts = response.data.data[0];
        //   // setName(ts.custName);
        //   // setEmail(ts.custEmail);
        //   // setNumber(ts.custContactNumber);
        //   // setBrand(ts.brand);
        //   // setService(ts.brandService);
        //   // setPackageName(ts.packageName);
        //   // setTypeOfSale(ts.saleType);
        //   // setSalesPerson(ts.salePerson);
        //   // setAmount(ts.amount);
        //   // setDiscount(ts.discount);
        //   // setAdditionalCharges(ts.additionalCharges);
        //   // setTotal(ts.total);
        //   // setSelectDiscription(ts.discription);
        //   // setDiscription(ts.detailDiscription);
        //   // setInvoiceLink(ts.invoiceLink);
        // }
      });
  };
  console.log("data", data);
  return (
    <>
      {isLoading ? (
        <>
          {/* info */}
          {/* <Grid
            container
            xs={12}
            sx={{
              height: "6vh",
              background: `${mainBackgound}`,
              color: `${white}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Roboto",
            }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <MailIcon sx={{ color: `${button}`, mr: 1 }} />
              info@britishacademicsexpert.co.uk{" "}
            </Typography>
            <Typography
              sx={{
                borderRight: "2px solid white",
                width: "15px",
                color: `${mainBackgound}`,
              }}
            >
              <div
                style={{ width: "100%", borderRight: "2px solid white" }}
              ></div>
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "10px",
                height: "100%",
              }}
            >
              <LocalPhoneIcon sx={{ color: `${button}`, mr: 1 }} />{" "}
              +442070971249
            </Typography>
          </Grid> */}
          {/* navbar */}
          <Grid
            container
            xs={12}
            sx={{
              height: "8vh",
              background: `${navbar}`,
              color: `${navbarText}`,
            }}
          >
            <Grid item md={1} xs={2}></Grid>
            <Grid
              item
              md={3}
              xs={8}
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={logo} height="40px" width="200px" alt="logo"></img>
            </Grid>
            <Grid item md={8} xs={2}></Grid>
          </Grid>
          {/* content */}
          <Grid
            container
            style={{
              maxWidth: "100vw",
              height: "80%",
              background: `${mainBackgound}`,
              display: "flex",
              alignItems: "center",
              flexFlow: "column",
              fontFamily: "Roboto",
            }}
            sx={{ p: 3 }}
          >
            {/* invoice section */}
            <Grid item md={5} xs={12}>
              <Paper
                sx={{
                  background: `${invoiceCard}`,
                  color: `${mainBackgound}`,
                  p: 2,
                  paddingTop: "20px",
                  paddingBottom: "10%",
                  borderRadius: "0px 50px",
                }}
              >
                <Grid container>
                  <Grid item className="row" container>
                    {" "}
                    <Grid
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        pr: 2,
                      }}
                    >
                      {/* <Typography variant="h6" display="block" gutterBottom>
                        {data.brand}
                      </Typography> */}

                      <img
                        src={logo}
                        height="40px" width="200px"
                        alt="logo"
                      ></img>
                    </Grid>{" "}
                    {/* <Grid
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                      xs={12}
                    >
                      <Typography variant="h6">OrderID</Typography>
                    </Grid>{" "} */}
                  </Grid>
                  <Grid item className="row" container>
                    {" "}
                    <Grid
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                      xs={12}
                    >
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                        style={{
                          background: `${mainBackgound}`,
                          color: "white",
                          padding: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        ORDER ID : {data.orderId}
                      </Typography>
                    </Grid>{" "}
                  </Grid>

                  <Grid item className="row" container>
                    {" "}
                    <Grid
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                      xs={12}
                    >
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        INVOICE TO : {data.custName}
                      </Typography>
                    </Grid>{" "}
                  </Grid>
                  <Grid item className="row" container>
                    {" "}
                    {/* <Grid
                      xs={6}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      Phone : 09876543
                    </Grid>{" "} */}
                    <Grid
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                      xs={12}
                    >
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        PHONE : {data.custContactNumber}
                      </Typography>
                    </Grid>{" "}
                  </Grid>
                  <Grid item className="row" container>
                    {" "}
                    {/* <Grid
                      xs={6}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      website : CyberClosses.com
                    </Grid>{" "} */}
                    <Grid
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                      xs={12}
                    >
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        EMAIL : {data.custEmail}
                      </Typography>
                    </Grid>{" "}
                  </Grid>
                  <Grid item className="row" container>
                    {" "}
                    {/* <Grid
                      xs={6}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      Email : abc@gmail.com
                    </Grid>{" "} */}
                    <Grid
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                      xs={12}
                    >
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        DATE : {data.dateTime.split(",")[0]}
                      </Typography>
                    </Grid>{" "}
                  </Grid>
                </Grid>

                {/* descrription */}
                <Grid
                  container
                  sx={{
                    background: `${mainBackgound}`,
                    p: 1,
                    borderRadius: "3px",
                    color: `${white}`,
                  }}
                >
                  <Grid
                    item
                    className="row"
                    container
                    sx={{
                      background: `${button}`,
                      color: `${mainBackgound}`,
                      borderRadius: "3px",
                      p: 1,
                    }}
                  >
                    {" "}
                    <Grid
                      xs={10}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                        sx={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItem: "center",
                        }}
                      >
                        Description
                      </Typography>
                    </Grid>{" "}
                    <Grid
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                      xs={2}
                    >
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                        sx={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItem: "center",
                        }}
                      >
                        Amount
                      </Typography>
                    </Grid>{" "}
                  </Grid>
                  <Grid item className="row" container sx={{ p: 1 }}>
                    {" "}
                    <Grid
                      xs={10}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      {data.discription}
                    </Grid>{" "}
                    <Grid
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                      xs={2}
                    >
                      {formatter.format(data.amount)}
                    </Grid>{" "}
                  </Grid>
                  <Grid item className="row" container sx={{ p: 1 }}>
                    {" "}
                    <Grid xs={1}></Grid>
                    <Grid
                      xs={9}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Typography
                        textAlign={"left"}
                        variant="body2"
                        gutterBottom
                      >
                        - {data.detailDiscription}
                      </Typography>
                    </Grid>{" "}
                    <Grid xs={4}></Grid>{" "}
                  </Grid>
                  <Grid item className="row" container sx={{ p: 1 }}>
                    {" "}
                    <Grid
                      xs={10}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      Additional Discount
                    </Grid>{" "}
                    <Grid
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                      xs={2}
                    >
                      -{formatter.format(data.discount)}
                    </Grid>{" "}
                  </Grid>
                  <Grid item className="row" container sx={{ p: 1 }}>
                    {" "}
                    <Grid
                      xs={10}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      Taxes and Fees
                    </Grid>{" "}
                    <Grid
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                      xs={2}
                    >
                      {formatter.format(data.additionalCharges)}
                    </Grid>{" "}
                  </Grid>
                  <Grid item className="row" container sx={{ p: 1 }}>
                    {" "}
                    <Grid
                      xs={10}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        borderTop: `2px solid ${cardBackground}`,
                        pt: 1,
                      }}
                    >
                      <Typography variant="button" display="block" gutterBottom>
                        PAYABLE AMOUNT
                      </Typography>
                    </Grid>{" "}
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        borderTop: `2px solid ${cardBackground}`,
                        pt: 1,
                      }}
                      xs={2}
                    >
                      <Typography variant="button" display="block" gutterBottom>
                        {formatter.format(data.total)}
                      </Typography>
                    </Grid>{" "}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* card section */}
            <Grid
              container
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Grid
                item
                md={4}
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexFlow: "column",
                }}
              >
                <Grid xs={12}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: `${button}`,
                      textAlign: "center",
                      paddingTop: "25px",
                      fontWeight: "300px !important",
                    }}
                  >
                    JUST ONE STEP LEFT
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: `${button}`,
                      textAlign: "center",
                      paddingTop: "5px",
                      marginBottom: "20px",
                    }}
                  >
                    TO ACTIVATE YOUR COUPON
                  </Typography>

                  <Typography
                    variant="h8"
                    sx={{
                      color: `${lightText}`,
                      textAlign: "center",
                      paddingTop: "10px",
                      marginTop: "20px",
                    }}
                  >
                    We're almost done here, just a few more things that we'd be
                    needing from you to welcome you onboard.
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: `${lightText}`,
                      textAlign: "center",
                      paddingTop: "15px",
                      paddingBottom: "15px",
                    }}
                  >
                    Secure Payment Globally!
                  </Typography>
                </Grid>
                <Paper
                  item
                  md={6}
                  xs={10}
                  sx={{
                    height: "100%",
                    width: "100%",
                    background: `${cardBackground}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexFlow: "column",
                    borderRadius: "10px",
                  }}
                >
                  <Grid
                    container
                    xs={12}
                    sx={{
                      maxHeight: "50px",
                      color: `${mainBackgound}`,
                      display: "flex",
                      justifyContent: "center",
                      alighItems: "center",
                      borderBottom: `2px solid ${mainBackgound}`,
                    }}
                  >
                    {" "}
                    <Grid
                      item
                      container
                      xs={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alighItems: "center",
                      }}
                    >
                      <Typography variant="h6">AMOUNT</Typography>{" "}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alighItems: "center",
                      }}
                    >
                      {" "}
                      <Typography variant="h6">
                        {formatter.format(data.total)}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      p: 4,
                      pt: 2,
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    {isPaid ? (
                      <Typography
                        variant="h5"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          background: "green",
                          color: "white",
                          padding: "20px",
                          borderRadius: "5px",
                        }}
                      >
                        <TaskAltIcon />
                        &nbsp; Already Paid
                      </Typography>
                    ) : (
                      <StripeCardForm
                        transactionId={invoiceId}
                        amount={Number(data.total)}
                        account={data.account}
                        stripeKey={key}
                      />
                    )}

                    <Grid sx={{ pt: 1 }}>
                      <img
                        src={stripeBadge}
                        height="100%"
                        width="100%"
                        alt="logo"
                      ></img>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {/* card logos */}
          <Grid
            item
            xs={12}
            sx={{
              height: "10vh",
              width: "100%",
              overflow: "hidden",
              background: `${cardBackground}`,
              // color: `${navbarText}`,
            }}
          >
            <Grid
              xs={12}
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid sx={{ p: 2 }}>
                <img src={ssl} height="60px" width="90px" alt="logo"></img>
              </Grid>
              <Grid sx={{ p: 2 }}>
                <img src={norton} height="30px" width="70px" alt="logo"></img>
              </Grid>
              <Grid sx={{ p: 2 }}>
                <img src={comoo} height="37px" width="70px" alt="logo"></img>
              </Grid>
              <Grid sx={{ p: 2 }}>
                <img src={visa} height="30px" width="75px" alt="logo"></img>
              </Grid>
              <Grid sx={{ p: 2 }}>
                <img
                  src={masterCard}
                  height="20px"
                  width="75px"
                  alt="logo"
                ></img>
              </Grid>
            </Grid>
          </Grid>

          {/* BLANK */}
          <Grid
            item
            xs={12}
            sx={{
              height: "6vh",
              background: `${mainBackgound}`,
              // color: `${navbarText}`,
            }}
          ></Grid>
          {/* footer */}
          <Grid
            item
            xs={12}
            sx={{
              height: "5vh",
              background: `${button}`,
              color: `${navbarText}`,
            }}
          >
            <Grid
              xs={12}
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h8" style={{ color: "black" }}>
                <b> ©{new Date().getFullYear()} {brandUrl} All Right Reserved.</b>
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="h5">
            {" "}
            <CircularProgress />
            LOADING
          </Typography>
        </>
      )}
      <CustomizedSnackbars
        isOpen={isOpen}
        severity={severity}
        message={message}
      />
    </>
  );
};

export default InvoicePage;
