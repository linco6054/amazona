import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import {
  addToCartAction,
  removeFromCartAction,
} from "../redux/actions/cartActions";
function Cart(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  useEffect(() => {
    if (id) {
      dispatch(addToCartAction(id, qty));
    }
  }, [id, dispatch, qty]);
  const removeFromCartHanler = (id) => {
    //   delete action
    dispatch(removeFromCartAction(id));
  };
  const checkOutHandler = () => {
    history.push(`/signin?redirect=shipping`);
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is Empty <Link to="/">Go shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img className="small" src={item.image} alt={item.name} />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>
                      {item.name} ({item.quantity})
                    </Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCartAction(item.product, Number(e.target.value))
                        )
                      }
                    >
                      <option value="1">select quantity</option>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHanler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)} items):
                ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </h2>
            </li>
            <li>
              <button
                className="block primary"
                type="button"
                onClick={checkOutHandler}
                disabled={cartItems.length === 0}
              >
                Proced To Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cart;
