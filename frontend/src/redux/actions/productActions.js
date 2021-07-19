import axios from "axios";
import CONSTANTS from "../constants/allConstance";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: CONSTANTS.products.PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get("/api/products");
    dispatch({ type: CONSTANTS.products.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONSTANTS.products.PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const detailsProduct = (id) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTANTS.product.PRODUCT_DETAILS_REQUEST,
      payload: id,
    });
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: CONSTANTS.product.PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CONSTANTS.product.PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const createProductAction = () => async (dispatch, getState) => {
  dispatch({
    type: CONSTANTS.product.PRODUCT_CREATE_REQUEST,
  });
  // get user info
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      "/api/products",
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: CONSTANTS.product.PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: CONSTANTS.product.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductAction = (product) => async (dispatch, getState) => {
  dispatch({
    type: CONSTANTS.product.PRODUCT_UPDATE_REQUEST,
    payload: product,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: CONSTANTS.product.PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONSTANTS.product.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProductAction =
  (productId) => async (dispatch, getState) => {
    dispatch({
      type: CONSTANTS.product.PRODUCT_DELETE_REQUEST,
      payload: productId,
    });

    const {
      userSignin: { userInfo },
    } = getState();

    try {
      const { data } = await axios.delete(`/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({
        type: CONSTANTS.product.PRODUCT_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CONSTANTS.product.PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
