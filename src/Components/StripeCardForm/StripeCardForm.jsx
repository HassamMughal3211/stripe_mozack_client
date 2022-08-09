import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// import './form.css'

import CheckOutForm from "./CheckOutForm";
import { url } from "../../baseUrl";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

// const stripePromise = loadStripe(
//   "pk_test_51L5CyVC7O5vYeWKXXHrYYuRhpG2n8bKee8SYC7ZdzbQ5Lo6ilLdC7QQJsIs2xHQfvNM4RuGMjl1Q2ZXigxzf3pvp00R6R7sJUB"
// );
//
export default function StripeCardForm({
  transactionId,
  amount,
  account,
  stripeKey,
}) {
  const [clientSecret, setClientSecret] = useState("");
  // console.log(transactionId, "/invoice/record/629fad5ac285ac387510f100	  ");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    console.log(account);
    fetch(`${url}/stripe/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transactionId: transactionId,
        amount: amount,
        account: account,
      }),
    })
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
      {
        // console.log("key22", stripeKey)
        clientSecret && (
          <Elements options={options} stripe={loadStripe(`${stripeKey}`)}>
            <CheckOutForm />
          </Elements>
        )
      }
    </div>
  );
}
