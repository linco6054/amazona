import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveShippingAddressAction } from "../redux/actions/cartActions";
import CheckOutSteps from "./../components/CheckOutSteps";
function ShippingAdress(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    history.push("/signin");
  }

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddressAction({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    history.push("/payment");
  };
  return (
    <div>
      <CheckOutSteps step1 step2 />
      <form onSubmit={handleSubmit} className="form">
        <div>
          <h1>Shipping Address</h1>
          <div>
            <label htmlFor="FullName">Full Name</label>
            <input
              required
              type="text"
              id="FullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="enter your full name"
            />
          </div>

          <div>
            <label htmlFor="Address">Address </label>
            <input
              required
              type="text"
              id="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="enter your Address"
            />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input
              required
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="enter your City"
            />
          </div>

          <div>
            <label htmlFor="postalCode">postalCode</label>
            <input
              required
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="enter your postalCode"
            />
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <input
              required
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="enter your country"
            />
          </div>
        </div>

        <div>
          <label></label>
          <button className="primary block" type="submit">
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAdress;
