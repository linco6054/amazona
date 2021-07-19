import axios from "axios";
import CONSTANTS from "../constants/allConstance";
export const addToCartAction =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    console.log(data);
    dispatch({
      type: CONSTANTS.cart.CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        quantity: quantity,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCartAction =
  (productId) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.cart.CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const saveShippingAddressAction = (data) => (dispatch) => {
  dispatch({
    type: CONSTANTS.cart.SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CONSTANTS.cart.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
};
