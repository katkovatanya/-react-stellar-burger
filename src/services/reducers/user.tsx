import { UserActionTypes } from "../actions";

interface IUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  password: string;
}

interface LoginAction {
  type: UserActionTypes.LOGIN;
  payload: {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: { email: string; name: string };
  };
  password: string;
}

interface ReristrationNewUserAction {
  type: UserActionTypes.REGISTRATION_NEW_USER;
  payload: {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: { email: string; name: string };
  };
}

interface LogoutAction {
  type: UserActionTypes.LOGOUT;
}

interface ChangeUserInfoAction {
  type: UserActionTypes.CHANGE_USER_INFO;
  payload: {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: { email: string; name: string };
  };
  password: string;
}

interface CheckTokenAction {
  type: UserActionTypes.CHECK_TOKEN;
}

interface GetUserAction {
  type: UserActionTypes.GET_USER;
  payload: {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: { email: string; name: string };
  };
}

export type TUserActions =
  | LoginAction
  | ReristrationNewUserAction
  | LogoutAction
  | ChangeUserInfoAction
  | CheckTokenAction
  | GetUserAction;

const initialState: IUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  password: "",
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): IUserState => {
  switch (action.type) {
    case UserActionTypes.REGISTRATION_NEW_USER: {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case UserActionTypes.LOGIN: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        password: action.password,
      };
    }
    case UserActionTypes.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case UserActionTypes.CHANGE_USER_INFO: {
      return {
        ...state,
        user: action.payload.user,
        password: action.password,
      };
    }
    case UserActionTypes.CHECK_TOKEN: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }
    case UserActionTypes.GET_USER: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    }
    default: {
      return state;
    }
  }
};
