import React from "react";
import { Link } from "react-router-dom";
function CheckOutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>
        <Link to="cart">Sign-In</Link>
      </div>
      <div className={props.step2 ? "active" : ""}>
        <Link to="/shipping">Shipping</Link>
      </div>
      <div className={props.step3 ? "active" : ""}>
        <Link to="/payment">Payment</Link>
      </div>
      <div className={props.step4 ? "active" : ""}>
        <Link to="/placeOrder">Place Order</Link>
      </div>
    </div>
  );
}

export default CheckOutSteps;
