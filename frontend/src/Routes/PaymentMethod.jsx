import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";
function PaymentMethod(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMehod] = useState("PayPal");
  const handleOnsubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeOrder");
  };
  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>

      <form className="form" onSubmit={handleOnsubmit}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              required
              checked
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              onChange={(e) => setPaymentMehod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div>
            <input
              required
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              onChange={(e) => setPaymentMehod(e.target.value)}
            />
            <label htmlFor="paypal">Stripe</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethod;
