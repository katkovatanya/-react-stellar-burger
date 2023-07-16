import {
  LOGIN,
  REGISTRATION_NEW_USER,
  LOGOUT,
  CHANGE_USER_INFO,
  CHECK_TOKEN,
  GET_USER
} from "../actions";

const initialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  password: ''
}


export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_NEW_USER: {
      return {
        ...state,
        user: action.payload.user
      };
    }
    case LOGIN: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        password: action.password
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
    case CHANGE_USER_INFO: {
      return {
        ...state,
        user: action.payload.user,
        password: action.password
      };
    }
    case CHECK_TOKEN: {
      return {
        ...state,
        isAuthChecked: true
      }
    }
    case GET_USER: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true
      }
    }
    default: {
      return state;
    }
  }
}