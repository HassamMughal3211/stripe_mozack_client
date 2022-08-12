import {
  accordionClasses,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { url } from "../../baseUrl";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  brandName,
  lightBackground,
  white,
} from "../../Assets/Theme/ThemeColors";
import CustomizedSnackbars from "../../Components/SnackBar/SnackBar";
import isAlpha from "validator/lib/isAlpha";
import isEmail from "validator/lib/isEmail";
import Navbar from "../../Components/Navbar/Navbar";

const TransactionForm = () => {
  let { id } = useParams();
  let param = id.split("_");
  const state = useSelector((state) => state.user.data);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [brand, setBrand] = useState(brandName);
  const [orderId, setOrderId] = useState("");
  const [packageName, setPackageName] = useState("");
  const [typeOfSale, setTypeOfSale] = useState("");
  const [salesPerson, setSalesPerson] = useState("");
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectDiscription, setSelectDiscription] = useState("");
  const [discription, setDiscription] = useState("");
  const [invoiceLink, setInvoiceLink] = useState("");
  const [allAccounts, setAllAccounts] = useState([]);
  const [account, setAccount] = useState("");
  const [isAccLoaded, setIsAccLoaded] = useState(true);
  const [allTypesOfSale, setAllTypesOfSale] = useState([
    { sale: "New" },
    { sale: "Existing" },
  ]);
  // var allAccounts = [];
  const [isReadOnly, setIsReadOnly] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const linkUrl = window.location.origin;
  const user = useSelector((state) => state.user.data);

  // console.log("user", user);

  let transactionId = param[0];
  let accessType = param[param.length - 1];

  const navigate = useNavigate();

  const getAllAccounts = async () => {
    try {
      if (accessType === "CREATE") {
        setIsAccLoaded(false);
        await axios.get(`${url}/stripe/getAllAccounts`).then((response) => {
          if (response.data.success) {
            setAllAccounts(response.data.data);
            console.log("response", response.data.data);
            // allAccounts = response.data.data;
            setIsAccLoaded(true);
          } else {
            console.log("error");
          }
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllAccounts();
  }, []);

  // useEffect(() => {
  //   console.log(allAccounts);
  // }, [allAccounts]);

  const submitForm = async () => {
    if (
      name &&
      email &&
      number &&
      brand &&
      orderId &&
      packageName &&
      typeOfSale &&
      salesPerson &&
      amount &&
      discount &&
      additionalCharges &&
      total &&
      selectDiscription &&
      discription &&
      account
    ) {
      setIsLoaded(true);
      let month;
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const d = new Date();
      month = monthNames[d.getMonth()];
      const data = {
        custName: name,
        custEmail: email,
        custContactNumber: number,
        brand,
        orderId: orderId,
        packageName,
        saleType: typeOfSale,
        salePerson: salesPerson,
        amount,
        discount,
        additionalCharges,
        total,
        discription: selectDiscription,
        detailDiscription: discription,
        year: new Date().getFullYear(),
        month,
        link: linkUrl,
        account,
      };
      // console.log("submit data", data);
      await axios
        .post(`${url}/transactions/addnew`, data, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then(function (response) {
          // console.log(response);
          if (response.data.success) {
            // console.log(response);
            // console.log("true");
            setIsOpen(true);
            setMessage("Record Saved!");
            setSeverity("success");
            setTimeout(() => {
              navigate("/transaction/list");
            }, 2000);
            setIsLoaded(false);
          } else {
            setIsOpen(true);
            setMessage(response.data.message);
            setSeverity("error");
            console.log(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          setIsOpen(true);
          setMessage(error.message);
          setSeverity("error");
        });
      setTimeout(() => {
        setIsOpen(false);
        setIsLoaded(false);
      }, 2000);
    } else {
      setIsOpen(true);
      setMessage("Fill the Required Feilds");
      setSeverity("error");
    }
  };
  const getSpecificTransaction = async () => {
    if (accessType === "readOnly") {
      await axios
        .post(`${url}/transactions/getSpecificTransaction`, {
          _id: transactionId,
        })
        .then((response) => {
          // console.log("response", response);
          if (response.data.success) {
            setIsReadOnly(true);
            let ts = response.data.data[0];
            setName(ts.custName);
            setEmail(ts.custEmail);
            setNumber(ts.custContactNumber);
            setBrand(ts.brand);
            setOrderId(ts.orderId);
            setPackageName(ts.packageName);
            setTypeOfSale(ts.saleType);
            setSalesPerson(ts.salePerson);
            setAmount(ts.amount);
            setDiscount(ts.discount);
            setAdditionalCharges(ts.additionalCharges);
            setTotal(ts.total);
            setSelectDiscription(ts.discription);
            setDiscription(ts.detailDiscription);
            setInvoiceLink(ts.invoiceLink);
            setAccount(ts.account);
          }
        });
    }
  };

  useEffect(() => {
    getSpecificTransaction();
  }, []);

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
        <Box
        // sx={{ mt: 3 }}
        >
          {isAccLoaded ? (
            <Paper sx={{ p: 3, mr: 2, ml: 2, background: `${white}` }}>
              <Grid
                container
                sx={{ p: 3, display: "flex", justifyContent: "center" }}
              >
                <Typography variant="h5" color="Primary">
                  {accessType === "CREATE" ? "Create Invoice" : "Invoice"}
                </Typography>
              </Grid>
              {accessType === "readOnly" ? (
                <Grid item container className="Row">
                  <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
                  <Grid item md={6} xs={12} sx={{ p: 1 }}>
                    <TextField
                      name="invoiceLink"
                      label="Invoice-Link"
                      type="text"
                      margin="normal"
                      fullWidth
                      disabled={isReadOnly}
                      value={invoiceLink}
                      onChange={(e) => setInvoiceLink(e.target.value)}
                    />
                  </Grid>

                  <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
                </Grid>
              ) : (
                []
              )}
              <Grid item container className="Row">
                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
                <Grid item md={3} xs={12} sx={{ p: 1 }}>
                  <TextField
                    name="name"
                    label="Customer Name"
                    type="text"
                    margin="normal"
                    fullWidth
                    disabled={isReadOnly}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12} sx={{ p: 1 }}>
                  <TextField
                    name="email"
                    label="customer Email"
                    type="text"
                    margin="normal"
                    fullWidth
                    disabled={isReadOnly}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
              </Grid>
              <Grid item container className="Row">
                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
                <Grid item md={3} xs={12} sx={{ p: 1 }}>
                  <TextField
                    name="number"
                    label="Contact Number"
                    type="text"
                    margin="normal"
                    fullWidth
                    disabled={isReadOnly}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12} sx={{ p: 1 }}>
                  <TextField
                    name="brand"
                    label="Brand Name"
                    type="text"
                    margin="normal"
                    fullWidth
                    disabled="true"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
              </Grid>
              <Grid item container className="Row">
                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
                <Grid item md={3} xs={12} sx={{ p: 1 }}>
                  <TextField
                    name="orderId"
                    label="Order ID"
                    type="text"
                    margin="normal"
                    fullWidth
                    disabled={isReadOnly}
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </Grid>
                <Grid item container md={3} xs={12} sx={{ p: 1 }}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Stripe Account
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={account}
                      margin="normal"
                      label="Select Stripe Account"
                      onChange={(e) => setAccount(e.target.value)}
                      disabled={isReadOnly}
                      style={{ textAlign: "left" }}
                    >
                      {accessType === "readOnly" ? (
                        <MenuItem value={account}>{account}</MenuItem>
                      ) : isAccLoaded ? (
                        allAccounts.length > 0 ? (
                          allAccounts.map((acc) => (
                            <MenuItem value={acc.account}>
                              {acc.account}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value={""}>none</MenuItem>
                        )
                      ) : (
                        []
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
              </Grid>
              <Grid item container className="Row">
                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
                <Grid item md={3} xs={12} sx={{ p: 1 }}>
                  {/* <TextField
                    name="typeOfSale"
                    label="Type Of Sale"
                    type="text"
                    margin="normal"
                    fullWidth
                    disabled={isReadOnly}
                    value={typeOfSale}
                    onChange={(e) => setTypeOfSale(e.target.value)}
                  /> */}
                  <FormControl margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Stripe Account
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={account}
                      margin="normal"
                      label="Select Stripe Account"
                      // onChange={(e) => setAccount(e.target.value)}
                      disabled={isReadOnly}
                      style={{ textAlign: "left" }}
                    >
                      {accessType === "readOnly" ? (
                        <MenuItem value={account}>{account}</MenuItem>
                      ) : isAccLoaded ? (
                        allTypesOfSale.length > 0 ? (
                          allTypesOfSale.map((acc) => (
                            <MenuItem value={acc.sale}>{acc.sale}</MenuItem>
                          ))
                        ) : (
                          <MenuItem value={""}>none</MenuItem>
                        )
                      ) : (
                        []
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={3} xs={12} sx={{ p: 1 }}>
                  <TextField
                    name="salesPerson"
                    label="Sale's Person"
                    type="text"
                    margin="normal"
                    fullWidth
                    disabled={isReadOnly}
                    value={salesPerson}
                    onChange={(e) => setSalesPerson(e.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>

                {/* <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
                <Grid item container md={6} xs={12} sx={{ p: 1 }}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Stripe Account
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={account}
                      margin="normal"
                      label="Select Stripe Account"
                      onChange={(e) => setAccount(e.target.value)}
                      disabled={isReadOnly}
                    >
                      {accessType === "readOnly" ? (
                        <MenuItem value={account}>{account}</MenuItem>
                      ) : isAccLoaded ? (
                        allAccounts.length > 0 ? (
                          allAccounts.map((acc) => (
                            <MenuItem value={acc.account}>
                              {acc.account}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value={""}>none</MenuItem>
                        )
                      ) : (
                        []
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid> */}
              </Grid>
              <Grid item container className="Row">
                <Grid item md={4} xs={0} sx={{ p: 1 }}></Grid>

                <Grid item container md={2} xs={12}>
                  <Grid item md={6} xs={12} sx={{ p: 1 }}>
                    <TextField
                      name="amount"
                      label="Amount"
                      type="number"
                      margin="normal"
                      fullWidth
                      disabled={isReadOnly}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ p: 1 }}>
                    <TextField
                      name="discount"
                      label="Discount"
                      type="number"
                      margin="normal"
                      fullWidth
                      disabled={isReadOnly}
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item container md={2} xs={12}>
                  <Grid item md={6} xs={12} sx={{ p: 1 }}>
                    <TextField
                      name="additionalCharges"
                      label="Addition Charges"
                      type="number"
                      margin="normal"
                      fullWidth
                      disabled={isReadOnly}
                      value={additionalCharges}
                      onChange={(e) => setAdditionalCharges(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ p: 1 }}>
                    <TextField
                      name="total"
                      label="Total"
                      type="number"
                      margin="normal"
                      fullWidth
                      disabled
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid item md={4} xs={0} sx={{ p: 1 }}></Grid>
              </Grid>

              <Grid item container className="Row">
                <Grid item md={5} xs={0} sx={{ p: 1 }}></Grid>
                <Grid item md={2} xs={12} sx={{ p: 1 }}>
                  <Button
                    disabled={isReadOnly}
                    onClick={() => {
                      let value = Number(amount) - Number(discount);
                      value = value + Number(additionalCharges);
                      setTotal(value);
                      // console.log(total);
                    }}
                    style={{
                      border: `1px solid ${lightBackground}`,
                      color: `${lightBackground}`,
                      background: `${white}`,
                    }}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  >
                    Calculate
                  </Button>
                </Grid>
                <Grid item md={5} xs={0} sx={{ p: 1 }}></Grid>
              </Grid>

              <Grid item container className="Row">
                <Grid item md={4} xs={0} sx={{ p: 1 }}></Grid>
                <Grid item md={4} xs={12} sx={{ p: 1 }}>
                  <TextField
                    name="selecDiscription"
                    label="Select Disription"
                    type="text"
                    margin="normal"
                    fullWidth
                    disabled={isReadOnly}
                    value={selectDiscription}
                    onChange={(e) => setSelectDiscription(e.target.value)}
                  />
                </Grid>

                <Grid item md={4} xs={0} sx={{ p: 1 }}></Grid>
              </Grid>
              <Grid item container className="Row">
                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
                <Grid item md={6} xs={12} sx={{ p: 1 }}>
                  <TextField
                    name="Discription"
                    label="Disription"
                    type="text"
                    minRows={4}
                    multiline
                    margin="normal"
                    fullWidth
                    disabled={isReadOnly}
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                  />
                </Grid>

                <Grid item md={3} xs={0} sx={{ p: 1 }}></Grid>
              </Grid>

              <Grid
                container
                className="Row"
                sx={{ mt: 2 }}
                style={{
                  gap: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {accessType !== "readOnly" ? (
                  <Grid item container md={2} xs={12}>
                    <Button
                      onClick={submitForm}
                      variant="contained"
                      style={{
                        background: `${lightBackground}`,
                        color: `${white}`,
                      }}
                      margin="normal"
                      fullWidth
                      disabled={isLoaded}
                    >
                      {isLoaded ? (
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
                      ) : accessType === "CREATE" ? (
                        "Generate Link"
                      ) : (
                        []
                      )}
                    </Button>
                  </Grid>
                ) : (
                  []
                )}
              </Grid>
              <Grid
                container
                className="Row"
                sx={{ mt: 2 }}
                style={{
                  gap: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item container md={1} xs={12}>
                  <Button
                    type="clear"
                    style={{
                      border: `1px solid ${lightBackground}`,
                      color: `${lightBackground}`,
                      background: `${white}`,
                    }}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onClick={() => {
                      navigate("/transaction/list");
                    }}
                  >
                    back
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            "loading..."
          )}
        </Box>
      </Container>
      <CustomizedSnackbars
        isOpen={isOpen}
        severity={severity}
        message={message}
      />
    </>
  );
};

export default TransactionForm;
