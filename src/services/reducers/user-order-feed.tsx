import { UserOrderFeedActionTypes } from "../actions/order-feed";
import { WebsocketStatus } from "../../utils/web-socket";
import { IOrderFeedAnswer, IOrderInterface } from "../../utils/ingredient-type";

interface IOrderFeed {
  status: string;
  orders: IOrderInterface[];
  connectingError: string;
}

interface UserOrderFeedWSDisconnectAction {
  type: UserOrderFeedActionTypes.USER_ORDER_FEED_DISCONNECT;
}

interface UserOrderFeedWSConnectAction {
  type: UserOrderFeedActionTypes.USER_ORDER_FEED_CONNECT;
  payload: "string";
}

interface UserOrderFeedWSConnectingAction {
  type: UserOrderFeedActionTypes.USER_ORDER_FEED_WS_CONNECTING;
}

interface UserOrderFeedWSCloseAction {
  type: UserOrderFeedActionTypes.USER_ORDER_FEED_WS_CLOSE;
}

interface UserOrderFeedWSOpenAction {
  type: UserOrderFeedActionTypes.USER_ORDER_FEED_WS_OPEN;
}

interface UserOrderFeedWSErrorAction {
  type: UserOrderFeedActionTypes.USER_ORDER_FEED_WS_ERROR;
  payload: string;
}

interface UserOrderFeedWSMessageAction {
  type: UserOrderFeedActionTypes.USER_ORDER_FEED_WS_MESSAGE;
  payload: IOrderFeedAnswer;
}

const initialState: IOrderFeed = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: "",
};

export type TUserOrderFeedActions =
  | UserOrderFeedWSDisconnectAction
  | UserOrderFeedWSConnectAction
  | UserOrderFeedWSConnectingAction
  | UserOrderFeedWSCloseAction
  | UserOrderFeedWSOpenAction
  | UserOrderFeedWSErrorAction
  | UserOrderFeedWSMessageAction;

export const userOrderFeedReducer = (
  state = initialState,
  action: TUserOrderFeedActions
): IOrderFeed => {
  switch (action.type) {
    case UserOrderFeedActionTypes.USER_ORDER_FEED_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case UserOrderFeedActionTypes.USER_ORDER_FEED_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: "",
      };
    case UserOrderFeedActionTypes.USER_ORDER_FEED_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case UserOrderFeedActionTypes.USER_ORDER_FEED_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case UserOrderFeedActionTypes.USER_ORDER_FEED_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
      };
    default:
      return state;
  }
};
