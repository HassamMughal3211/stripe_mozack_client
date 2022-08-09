import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../baseUrl";
import DatatablePage from "../../Components/DataTable/DataTable";
import CustomizedSnackbars from "../../Components/SnackBar/SnackBar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import {
  brandName,
  darkButton,
  lightBackground,
  lightText,
  white,
} from "../../Assets/Theme/ThemeColors";
import { useSelector } from "react-redux";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Navbar from "../../Components/Navbar/Navbar";

const TransactionList = () => {
  const user = useSelector((state) => state.user.data);

  console.log("user", user);

  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  let navigate = useNavigate();
  // const navigate = useNavigate();

  const transactionObject = {
    transactionId: "1234567",
    year: 2022,
    month: "april",
    dateTime: "22/04/2022-13:00",
    custName: "Customer1",
    custEmail: "cust1@gmail.com",
    custContactNumber: "01234567",
    brand: "CyberClosys",
    brandService: "abcd",
    packageName: "standard",
    saleType: "one time",
    salePerson: "peter",
    amount: 200,
    discount: 30,
    additionalCharges: 10,
    total: 180,
    discription: "wordpress",
    detailDiscription: "qwertyuiopasdfghjklzxcvbnm",
    invoiceLink: "http:abcd.com/invoice_000000",
  };

  const columns = [
    {
      label: "Action",
      field: "action",
      sort: "asc",
      width: 100,
    },
    {
      label: "Year",
      field: "year",
      sort: "asc",
      width: 100,
    },
    {
      label: "Month",
      field: "month",
      sort: "asc",
      width: 100,
    },

    {
      label: "Date",
      field: "dateTime",
      sort: "asc",
      width: 200,
    },

    {
      label: "Customer Name",
      field: "custName",
      sort: "asc",
      width: 250,
    },
    {
      label: "Email Address",
      field: "custEmail",
      sort: "asc",
      width: 250,
    },
    {
      label: "Phone Number",
      field: "custContactNumber",
      sort: "asc",
      width: 250,
    },
    {
      label: "Brand",
      field: "brand",
      sort: "asc",
      width: 150,
    },
    {
      label: "Brand Service",
      field: "brandService",
      sort: "asc",
      width: 150,
    },
    {
      label: "Package",
      field: "packageName",
      sort: "asc",
      width: 150,
    },
    {
      label: "Type Of Sale",
      field: "saleType",
      sort: "asc",
      width: 150,
    },
    {
      label: "Sale's Person",
      field: "salePerson",
      sort: "asc",
      width: 250,
    },
    {
      label: "Total Amount",
      field: "total",
      sort: "asc",
      width: 100,
    },
    {
      label: "Account",
      field: "account",
      sort: "asc",
      width: 100,
    },
    {
      label: "Payment Status",
      field: "paymentStatus",
      sort: "asc",
      width: 100,
    },
    {
      label: "Payment Time",
      field: "paymentTime",
      sort: "asc",
      width: 100,
    },
    {
      label: "Discription",
      field: "discription",
      sort: "asc",
      width: 150,
    },
    {
      label: "Invoice-Link",
      field: "invoiceLink",
      sort: "asc",
      width: 300,
    },
    {
      label: "Stripe ID",
      field: "stripeId",
      sort: "asc",
      width: 150,
    },
  ];
  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    try {
      setIsLoaded(true);
      const response = await axios
        .post(
          `${url}/transactions/getAllTransactions`,
          {
            brand: brandName,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((data) => {
          console.log("data", data.data.data);

          setData({
            columns,
            rows: data.data.data.map((item) => ({
              ...item,
              paymentStatus: item.paymentStatus ? (
                <Typography
                  variant="button"
                  style={{
                    width: "200px",
                    padding: "10px",
                    background: "green",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  {" "}
                  paid
                </Typography>
              ) : (
                <Typography
                  variant="button"
                  style={{
                    width: "200px",
                    padding: "10px",
                    background: "red",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  unpaid
                </Typography>
              ),

              paymentTime: item.paymentStatus ? item.updatedAt : "",
              action: (
                <>
                  <span
                    onClick={() =>
                      navigate(`/transaction/record/${item._id}_readOnly`)
                    }
                    style={{ color: `${lightBackground}`, cursor: "pointer" }}
                    title="view "
                  >
                    <RemoveRedEyeIcon />
                  </span>
                </>
              ),
            })),
          });
          setIsOpen(true);
          setMessage("Data Loaded!");
          setSeverity("success");
          setIsLoaded(false);
        });
    } catch (error) {
      console.log("error", error.message);
      setIsLoaded(false);
      setIsOpen(true);
      setMessage(error.message);
      setSeverity("error");
    }
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <Container
        style={{
          maxWidth: "100%",
          padding: "0px",
          overflowY: "scroll",
          height: "94vh",
        }}
      >
        <Paper fullWidth sx={{ m: 1, p: 2, maxWidth: "100%" }}>
          <Grid style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant="h5" color={`${lightText} `}>
              All Transactions
            </Typography>
          </Grid>
          <Grid xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => navigate(`/transaction/record/00000000000_CREATE`)}
              variant="contained"
              style={{ background: `${lightBackground}`, color: `${white}` }}
              // color={`${darkButton}`}
            >
              Generate New Link
            </Button>
          </Grid>
          <DatatablePage data={data} isLoaded={isLoaded} />
        </Paper>
      </Container>
      <CustomizedSnackbars
        isOpen={isOpen}
        severity={severity}
        message={message}
      />
    </>
  );
};

export default TransactionList;
