import CONSTANTS from "../constants/allConstance";
import axios from "axios";
export const createOrderAction = (order) => async (dispatch, getState) => {
  dispatch({
    type: CONSTANTS.order.ORDER_CREATE_REQUEST,
    payload: order,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: CONSTANTS.order.ORDER_CREATE_SUCCESS,
      payload: data.order,
    });
    dispatch({
      type: CONSTANTS.cart.CART_EMPTY,
    });

    // remove data from local storage

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: CONSTANTS.order.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrderAction = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: CONSTANTS.orderDetails.ORDER_DETAILS_REQUEST,
    payload: orderId,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: CONSTANTS.orderDetails.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONSTANTS.orderDetails.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrderAction =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: CONSTANTS.orderPay.ORDER_PAY_REQUEST,
      payload: { order, paymentResult },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: CONSTANTS.orderPay.ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CONSTANTS.orderPay.ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyOrdersActions = () => async (dispatch, getState) => {
  dispatch({
    type: CONSTANTS.myOrders.ORDER_LIST_REQUEST,
  });

  try {
    // get user info
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/orders/mine", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: CONSTANTS.myOrders.ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONSTANTS.myOrders.ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrdersAction = () => async (dispatch, getState) => {
  dispatch({ type: CONSTANTS.order.ALL_ORDERS_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get("/api/orders", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: CONSTANTS.order.ALL_ORDERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONSTANTS.order.ALL_ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOrderAction = (orderId) => async (dispatch, getState) => {
  dispatch({ type: CONSTANTS.order.ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: CONSTANTS.order.ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONSTANTS.order.ORDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrderAction = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: CONSTANTS.order.ORDER_DELIVER_REQUEST,
    payload: orderId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: CONSTANTS.order.ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONSTANTS.order.ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
