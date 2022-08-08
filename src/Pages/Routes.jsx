import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import InvoicePage from "./Invoice/InvoicePage";

import SignIn from "./SignIn/SignIn";
import Success from "./Success/Success";
import TransactionForm from "./Transactions/TransactionForm";
import TransactionList from "./Transactions/TransactionList";

const Routers = () => {
  const state = useSelector((state) => state.user.data.success);
  console.log(state)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invoice/record/:id" element={<InvoicePage />} />
        <Route
          path="/"
          element={
            state ? <Navigate to="/transaction/list" replace /> : <SignIn />
          }
        />
        <Route
          path="/transaction/record/:id"
          element={
            !state ? <Navigate to="/" replace /> : <TransactionForm />
          }
        />
        <Route
          path="/transaction/list"
          element={
            !state ? <Navigate to="/" replace /> : <TransactionList />
          }
        />
        <Route
          path="/success"
          element={
            <Success />
          }
        />

        {/* <Route path="/transaction/record/:id" element={<TransactionForm />} />
        <Route path="/transaction/list" element={<TransactionList />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
