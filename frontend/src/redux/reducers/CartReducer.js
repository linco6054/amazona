import CONSTANTS from "../constants/allConstance";

const initialState = {
  cartItems: [],
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.cart.CART_ADD_ITEM:
      const item = action.payload;
      const existingProduct = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (existingProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existingProduct.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CONSTANTS.cart.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CONSTANTS.cart.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CONSTANTS.cart.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CONSTANTS.cart.CART_EMPTY:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
