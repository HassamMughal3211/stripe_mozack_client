import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// import './form.css'

import CheckOutForm from "./CheckOutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51L6vf2AA98Nftlb4FjyYrzmvxsdWxrMc6BgpGYJRqZIwfWJe5lRaleCcmVxmsgXwiLgpLx1j5evX657krQRLIXh000Tx9LNKek"
);

export default function StripeCardForm({transactionId , amount}) {
  const [clientSecret, setClientSecret] = useState("");
  console.log(transactionId, "/invoice/record/629fad5ac285ac387510f100	  ")

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      "https://sgi-stripe.herokuapp.com/api/v1/stripe/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId: transactionId, 
          amount:amount
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
}
