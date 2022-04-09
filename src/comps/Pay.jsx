import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
const axios = require('axios')

const KEY =
  "pk_test_51KlKF3Lox0HPXgKW3hmM7CaoMLH4Ooe2a2h5v2rYZuVQ2Do2RITshrzflOFnlmbqAI5LakWQBgrJWlpro96uA1Ho00rNCW5t0O";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3001/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 28500,
          }
        );

        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    stripeToken && makeRequest()
  }, [stripeToken]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StripeCheckout
        name="Styles By Serve"
        image="https://avatars.githubusercontent.com/u/51814805?v=4"
        billingAddress
        shippingAddress
        description=" Your total is $285"
        amount={28500}
        token={onToken}
        stripeKey={KEY}
      >
        <button
          style={{
            border: "none",
            borderRadius: 5,
            width: 120,
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Pay;
