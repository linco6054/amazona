import CONSTANTS from "../constants/allConstance";
const initialStateList = {
  loading: true,
  products: [],
};
export const productListReducer = (state = initialStateList, action) => {
  switch (action.type) {
    case CONSTANTS.products.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case CONSTANTS.products.PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case CONSTANTS.products.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialStateDetails = {
  loading: true,
};
export const productDetailsReducer = (state = initialStateDetails, action) => {
  switch (action.type) {
    case CONSTANTS.product.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CONSTANTS.product.PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case CONSTANTS.product.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.product.PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case CONSTANTS.product.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case CONSTANTS.product.PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CONSTANTS.product.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.product.PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case CONSTANTS.product.PRODUCT_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case CONSTANTS.product.PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CONSTANTS.product.PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.product.PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case CONSTANTS.product.PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case CONSTANTS.product.PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CONSTANTS.product.PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
