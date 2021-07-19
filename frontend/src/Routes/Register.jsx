import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { registerAction } from "../redux/actions/userActions";
function Register(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPass, setConfirmPassword] = useState(null);
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const submitHadler = (e) => {
    e.preventDefault();
    // submit signing action
    if (confirmPass !== password) {
      alert("passwords Do not match");
    } else {
      dispatch(registerAction(name, email, password));
    }
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
          <h1>Register</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="John James"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="ConfirmPassword"
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label></label>
          <button type="submit" className="block primary">
            Register
          </button>
        </div>
        <div>
          <label></label>
          <div>
            Already Have an Account{" "}
            <Link to={`/SignIn?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
