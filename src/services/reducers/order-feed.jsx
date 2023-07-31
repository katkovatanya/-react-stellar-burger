import { ORDER_FEED_WS_CONNECTING, ORDER_FEED_WS_CLOSE, ORDER_FEED_WS_OPEN, ORDER_FEED_WS_ERROR, ORDER_FEED_WS_MESSAGE } from "../actions/order-feed"
import { WebsocketStatus } from "../../utils/web-socket";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: ''
};


export const orderFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_FEED_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      };
    case ORDER_FEED_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: ''
      };
    case ORDER_FEED_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE
      };
    case ORDER_FEED_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload
      };
    case ORDER_FEED_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload
      };
    default:
      return state;
  }
}