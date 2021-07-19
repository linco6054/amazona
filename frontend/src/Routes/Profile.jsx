import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsUserAction,
  updateUserProfileAction,
} from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import CONSTANTS from "../redux/constants/allConstance";
function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");
  // get user _id
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // get user details
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({
        type: CONSTANTS.user.USER_UPDATE_PROFILE_RESET,
      });
      dispatch(detailsUserAction(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo, user]);
  const submitHadler = (e) => {
    e.preventDefault();
    // update
    if (password !== confirmPass) {
      alert("Password do not match");
    } else {
      dispatch(
        updateUserProfileAction({ userId: user._id, name, email, password })
      );
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHadler}>
        <div>
          <h1>User Profile</h1>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {loadingUpdate && <LoadingBox></LoadingBox>}

              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant="success">
                  Profile update successfully
                </MessageBox>
              )}
              <div>
                <label htmlFor="name">Name</label>
                <input
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  type="text"
                  placeholder="enter Name"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={email}
                  id="email"
                  type="email"
                  placeholder="enter email"
                />
              </div>
              <div>
                <label htmlFor="password">password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="enter password"
                />
              </div>
              <div>
                <label htmlFor="Confirmpassword">Confirm password</label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="Confirmpassword"
                  type="password"
                  placeholder="Confirm password"
                />
              </div>
              <div>
                <label />
                <button type="submit" className="primary block">
                  Update
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
