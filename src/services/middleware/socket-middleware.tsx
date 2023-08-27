import { TWsActions } from "../actions/order-feed";
import { TOrderFeedActions } from "../reducers/order-feed";
import { Middleware, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { TUserOrderFeedActions } from "../reducers/user-order-feed";

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store: {
    dispatch: (type: TOrderFeedActions | TUserOrderFeedActions) => void;
  }) => {
    let socket: WebSocket | null = null;

    return (next: Dispatch<AnyAction>) =>
      (action: TOrderFeedActions | TUserOrderFeedActions) => {
        const { dispatch } = store;
        const { type } = action;
        const {
          wsConnect,
          onOpen,
          onClose,
          onError,
          onMessage,
          wsConnecting,
          wsDisconnect,
        } = wsActions;

        if (type === wsConnect) {
          socket = new WebSocket(action.payload);
          dispatch({ type: wsConnecting });
        }

        if (socket) {
          socket.onopen = () => {
            dispatch({ type: onOpen });
          };

          socket.onerror = () => {
            dispatch({ type: onError, payload: "Error" });
          };

          socket.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parsedData = JSON.parse(data);

            dispatch({ type: onMessage, payload: parsedData });
          };

          socket.onclose = () => {
            dispatch({ type: onClose });
          };

          if (type === wsDisconnect) {
            socket.close();
            socket = null;
          }
        }

        next(action);
      };
  };
};
