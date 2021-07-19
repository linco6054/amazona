import CONSTANTS from "./../constants/allConstance";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.order.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONSTANTS.order.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        order: action.payload,
      };
    case CONSTANTS.order.ORDER_CREATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CONSTANTS.order.ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CONSTANTS.orderDetails.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONSTANTS.orderDetails.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case CONSTANTS.orderDetails.ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.orderPay.ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONSTANTS.orderPay.ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case CONSTANTS.orderPay.ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CONSTANTS.orderPay.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMineListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case CONSTANTS.myOrders.ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONSTANTS.myOrders.ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case CONSTANTS.myOrders.ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case CONSTANTS.order.ALL_ORDERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONSTANTS.order.ALL_ORDERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case CONSTANTS.order.ALL_ORDERS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.order.ORDER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONSTANTS.order.ORDER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case CONSTANTS.order.ORDER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CONSTANTS.order.ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.order.ORDER_DELIVER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONSTANTS.order.ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case CONSTANTS.order.ORDER_DELIVER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CONSTANTS.order.ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
