import { OrderFeedActionTypes } from "../actions/order-feed";
import { WebsocketStatus } from "../../utils/web-socket";
import { IOrderInterface } from "../../utils/ingredient-type";

interface IOrderFeed {
  status: string;
  orders: string[];
  connectingError: any;
  total?: number;
  totalToday?: number;
}

interface OrderFeedWSConnectingAction {
  type: OrderFeedActionTypes.ORDER_FEED_WS_CONNECTING;
}

interface OrderFeedWSCloseAction {
  type: OrderFeedActionTypes.ORDER_FEED_WS_CLOSE;
}

interface OrderFeedWSOpenAction {
  type: OrderFeedActionTypes.ORDER_FEED_WS_OPEN;
}

interface OrderFeedWSErrorAction {
  type: OrderFeedActionTypes.ORDER_FEED_WS_ERROR;
  payload: any;
}

interface OrderFeedWSMessageAction {
  type: OrderFeedActionTypes.ORDER_FEED_WS_MESSAGE;
  payload: any;
}

const initialState: IOrderFeed = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: "",
  total: 0,
  totalToday: 0,
};

export type TOrderFeedActions =
  | OrderFeedWSConnectingAction
  | OrderFeedWSCloseAction
  | OrderFeedWSOpenAction
  | OrderFeedWSErrorAction
  | OrderFeedWSMessageAction;

export const orderFeedReducer = (
  state = initialState,
  action: TOrderFeedActions
): IOrderFeed => {
  switch (action.type) {
    case OrderFeedActionTypes.ORDER_FEED_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case OrderFeedActionTypes.ORDER_FEED_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: "",
      };
    case OrderFeedActionTypes.ORDER_FEED_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case OrderFeedActionTypes.ORDER_FEED_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case OrderFeedActionTypes.ORDER_FEED_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
