import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  user: {},
  loading: false,
  token: null,
  error: "",
  userName: "",
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.ADD_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case actionTypes.GET_ALL_USERS:
      return {
        ...state,
        loading: true,
        error: "",
      };
      case actionTypes.GET_ALL_USERS_FILES:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case actionTypes.GET_ALL_USERS_LOGIN:
          return {
            ...state,
            loading: true,
            error: "",
          };
          case actionTypes.GET_ALL_USERS_LOGIN_FILES:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
    default:
      return state;
  }
};

export default store;
