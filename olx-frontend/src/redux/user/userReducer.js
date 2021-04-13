import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGOUT_USER,
} from "./userTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isAuthenticated: true, user }
  : { isAuthenticated: false, user: {} };

// const initialState = {
//   user: {},
//   error: "",
//   isAuthenticated: false,
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        user: action.payload,
        error: "",
        isAuthenticated: true,
      };
    case FETCH_USER_FAILURE:
      return {
        user: {},
        error: action.payload,
        isAuthenticated: false,
      };
    case LOGOUT_USER:
      return {
        user: {},
        error: "",
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
