import React, { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "./../components/CheckOutSteps";
import { Link } from "react-router-dom";
import { createOrderAction } from "../redux/actions/orderActions";
import CONSTANTS from "../redux/constants/allConstance";
function PlaceOrder(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  // get order create object from store
  const orderCreate = useSelector((state) => state.orderCreate);

  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice < 100 ? toPrice(0) : toPrice(100);
  const dispatch = useDispatch();
  cart.taxPrice = toPrice(0.14 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const placeOrderHandler = () => {
    dispatch(createOrderAction({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({
        type: CONSTANTS.order.ORDER_CREATE_RESET,
      });
    }
  }, [success, dispatch, order, props.history]);
  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {cart.shippingAddress.fullName}
                  <br /> <br /> <strong>Address:</strong>{" "}
                  {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment </h2>
                <p>
                  <strong>MeThod: </strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Ordered Items </h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            className="small"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name} ({item.quantity})
                          </Link>
                        </div>

                        <div>
                          {item.quantity} * ${item.price}={" "}
                          {item.quantity * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items Total Price</div>
                  <div>{cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping </div>
                  <div>{cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>{cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total Price</strong>
                  </div>
                  <div>
                    <strong>{cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
                <li>
                  <button
                    className="primary block"
                    onClick={placeOrderHandler}
                    type="button"
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </button>
                </li>
              </li>

              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
