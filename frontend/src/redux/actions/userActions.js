import CONSTANTS from "../constants/allConstance";
import axios from "axios";

export const signInAction = (email, password) => async (dispatch, getState) => {
  dispatch({
    type: CONSTANTS.user.USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    //send signIn request and get user info and webTokens
    const { data } = await axios.post("/api/users/signing", {
      email,
      password,
    });
    dispatch({
      type: CONSTANTS.user.USER_SIGNIN_SUCCESS,
      payload: data,
    });

    // save user data in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CONSTANTS.user.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// registerAction

export const registerAction =
  (name, email, password) => async (dispatch, getState) => {
    dispatch({
      type: CONSTANTS.user.USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });
    try {
      //send signIn request and get user info and webTokens
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({
        type: CONSTANTS.user.USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: CONSTANTS.user.USER_SIGNIN_SUCCESS,
        payload: data,
      });

      // save user data in local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: CONSTANTS.user.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signOutAction = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: CONSTANTS.user.USER_SIGNIN_SIGNOUT });
};

export const detailsUserAction = (userId) => async (dispatch, getState) => {
  dispatch({
    type: CONSTANTS.user.USER_DETAILS_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: CONSTANTS.user.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONSTANTS.user.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUserProfileAction = (user) => async (dispatch, getState) => {
  dispatch({
    type: CONSTANTS.user.USER_UPDATE_PROFILE_REQUEST,
    payload: user,
  });
  //get user info
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put(`/api/users/profile`, user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: CONSTANTS.user.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    // update user userInfo
    dispatch({
      type: CONSTANTS.user.USER_SIGNIN_SUCCESS,
      payload: data,
    });
    // update local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CONSTANTS.user.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
