import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { signInAction } from "../redux/actions/userActions";
function SignIn(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const signedInUserInfo = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = signedInUserInfo;
  const submitHadler = (e) => {
    e.preventDefault();
    // submit signing action
    dispatch(signInAction(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [redirect, props.history, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHadler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="email@domain.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Email Address</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label></label>
          <button type="submit" className="block primary">
            Sign in
          </button>
        </div>
        <div>
          <label></label>
          <div>
            New Customer{" "}
            <Link to={`/register?redirect=${redirect}`}>Register</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
