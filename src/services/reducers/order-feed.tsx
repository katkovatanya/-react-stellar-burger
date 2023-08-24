import { OrderFeedActionTypes } from "../actions/order-feed";
import { WebsocketStatus } from "../../utils/web-socket";

interface IOrderFeed {
  status: string;
  orders: any;
  connectingError: any;
  total?: any;
  totalToday?: any;
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
  total: [],
  totalToday: [],
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
