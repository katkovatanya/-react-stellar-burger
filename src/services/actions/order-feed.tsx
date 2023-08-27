// export const ORDER_FEED_CONNECT: "ORDER_FEED_CONNECT" = "ORDER_FEED_CONNECT";
// export const ORDER_FEED_DISCONNECT: "ORDER_FEED_DISCONNECT" =
//   "ORDER_FEED_DISCONNECT";

export enum OrderFeedActionTypes {
  ORDER_FEED_CONNECT = "ORDER_FEED_CONNECT",
  ORDER_FEED_DISCONNECT = "ORDER_FEED_DISCONNECT",
  ORDER_FEED_WS_CONNECTING = "ORDER_FEED_WS_CONNECTING",
  ORDER_FEED_WS_CLOSE = "ORDER_FEED_WS_CLOSE",
  ORDER_FEED_WS_OPEN = "ORDER_FEED_WS_OPEN",
  ORDER_FEED_WS_ERROR = "ORDER_FEED_WS_ERROR",
  ORDER_FEED_WS_MESSAGE = "ORDER_FEED_WS_MESSAGE",
}

export enum UserOrderFeedActionTypes {
  USER_ORDER_FEED_CONNECT = "USER_ORDER_FEED_CONNECT",
  USER_ORDER_FEED_DISCONNECT = "USER_ORDER_FEED_DISCONNECT",
  USER_ORDER_FEED_WS_CONNECTING = "USER_ORDER_FEED_WS_CONNECTING",
  USER_ORDER_FEED_WS_CLOSE = "USER_ORDER_FEED_WS_CLOSE",
  USER_ORDER_FEED_WS_OPEN = "USER_ORDER_FEED_WS_OPEN",
  USER_ORDER_FEED_WS_ERROR = "USER_ORDER_FEED_WS_ERROR",
  USER_ORDER_FEED_WS_MESSAGE = "USER_ORDER_FEED_WS_MESSAGE",
}

export const connectWS = (url: string) => ({
  type: OrderFeedActionTypes.ORDER_FEED_CONNECT,
  payload: url,
});

export const disconnectWS = () => ({
  type: OrderFeedActionTypes.ORDER_FEED_DISCONNECT,
});

export const connectUserWS = (url: string) => ({
  type: UserOrderFeedActionTypes.USER_ORDER_FEED_CONNECT,
  payload: url,
});

export const disconnectUserWS = () => ({
  type: UserOrderFeedActionTypes.USER_ORDER_FEED_DISCONNECT,
});

export type TWsActions = {
  wsConnect:
    | OrderFeedActionTypes.ORDER_FEED_CONNECT
    | UserOrderFeedActionTypes.USER_ORDER_FEED_CONNECT;
  wsDisconnect:
    | OrderFeedActionTypes.ORDER_FEED_DISCONNECT
    | UserOrderFeedActionTypes.USER_ORDER_FEED_DISCONNECT;
  wsConnecting:
    | OrderFeedActionTypes.ORDER_FEED_WS_CONNECTING
    | UserOrderFeedActionTypes.USER_ORDER_FEED_WS_CONNECTING;
  onOpen:
    | OrderFeedActionTypes.ORDER_FEED_WS_OPEN
    | UserOrderFeedActionTypes.USER_ORDER_FEED_WS_OPEN;
  onClose:
    | OrderFeedActionTypes.ORDER_FEED_WS_CLOSE
    | UserOrderFeedActionTypes.USER_ORDER_FEED_WS_CLOSE;
  onError:
    | OrderFeedActionTypes.ORDER_FEED_WS_ERROR
    | UserOrderFeedActionTypes.USER_ORDER_FEED_WS_ERROR;
  onMessage:
    | OrderFeedActionTypes.ORDER_FEED_WS_MESSAGE
    | UserOrderFeedActionTypes.USER_ORDER_FEED_WS_MESSAGE;
};
