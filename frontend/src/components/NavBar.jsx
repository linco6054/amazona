import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutAction } from "../redux/actions/userActions";
function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const signedInUserInfo = useSelector((state) => state.userSignin);
  const { userInfo } = signedInUserInfo;

  const { cartItems } = cart;
  const signOutHandler = () => {
    dispatch(signOutAction());
    window.location.reload();
    history.push("/");
  };
  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          Amazon
        </Link>
      </div>
      <div>
        <Link to="/cart">
          Cart
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>
        {userInfo ? (
          <div className="dropdown">
            <Link to="jj#">
              {userInfo.name} <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/Profile">Profile</Link>
              </li>
              <li>
                <Link to="orderhistory">Order History</Link>
              </li>
              <li>
                <Link to="/" onClick={signOutHandler}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin">Sign in</Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <Link to="#admin">
              Admin <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/productList">Products</Link>
              </li>
              <li>
                <Link to="/ordersList">Orders</Link>
              </li>
              <li>
                <Link to="/userList">Users</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavBar;
