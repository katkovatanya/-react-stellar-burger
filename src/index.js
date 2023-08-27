import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
// import { compose, createStore, applyMiddleware, getState } from 'redux';
import { rootReducer } from "./services/reducers";
// import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./services/middleware/socket-middleware";
import {
  OrderFeedActionTypes, UserOrderFeedActionTypes,
} from "./services/actions/order-feed";

const orderFeedMiddleware = socketMiddleware({
  wsConnect: OrderFeedActionTypes.ORDER_FEED_CONNECT,
  wsDisconnect: OrderFeedActionTypes.ORDER_FEED_DISCONNECT,
  wsConnecting: OrderFeedActionTypes.ORDER_FEED_WS_CONNECTING,
  onOpen: OrderFeedActionTypes.ORDER_FEED_WS_OPEN,
  onClose: OrderFeedActionTypes.ORDER_FEED_WS_CLOSE,
  onError: OrderFeedActionTypes.ORDER_FEED_WS_ERROR,
  onMessage: OrderFeedActionTypes.ORDER_FEED_WS_MESSAGE,
});

const userOrderFeedMiddleware = socketMiddleware({
  wsConnect: UserOrderFeedActionTypes.USER_ORDER_FEED_CONNECT,
  wsDisconnect: UserOrderFeedActionTypes.USER_ORDER_FEED_DISCONNECT,
  wsConnecting: UserOrderFeedActionTypes.USER_ORDER_FEED_WS_CONNECTING,
  onOpen: UserOrderFeedActionTypes.USER_ORDER_FEED_WS_OPEN,
  onClose: UserOrderFeedActionTypes.USER_ORDER_FEED_WS_CLOSE,
  onError: UserOrderFeedActionTypes.USER_ORDER_FEED_WS_ERROR,
  onMessage: UserOrderFeedActionTypes.USER_ORDER_FEED_WS_MESSAGE,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderFeedMiddleware, userOrderFeedMiddleware);
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();
