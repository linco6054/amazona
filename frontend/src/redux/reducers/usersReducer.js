import CONSTANTS from "../constants/allConstance";

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.user.USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONSTANTS.user.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case CONSTANTS.user.USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CONSTANTS.user.USER_SIGNIN_SIGNOUT:
      return {
        ...state,
        loading: false,
        userInfo: {},
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.user.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONSTANTS.user.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case CONSTANTS.user.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CONSTANTS.user.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CONSTANTS.user.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case CONSTANTS.user.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.user.USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case CONSTANTS.user.USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, success: true };
    case CONSTANTS.user.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CONSTANTS.user.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
