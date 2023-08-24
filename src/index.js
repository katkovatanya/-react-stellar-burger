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
  ORDER_FEED_CONNECT,
  ORDER_FEED_DISCONNECT,
  OrderFeedActionTypes,
} from "./services/actions/order-feed";

const orderFeedMiddleware = socketMiddleware({
  wsConnect: ORDER_FEED_CONNECT,
  wsDisconnect: ORDER_FEED_DISCONNECT,
  wsConnecting: OrderFeedActionTypes.ORDER_FEED_WS_CONNECTING,
  onOpen: OrderFeedActionTypes.ORDER_FEED_WS_OPEN,
  onClose: OrderFeedActionTypes.ORDER_FEED_WS_CLOSE,
  onError: OrderFeedActionTypes.ORDER_FEED_WS_ERROR,
  onMessage: OrderFeedActionTypes.ORDER_FEED_WS_MESSAGE,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderFeedMiddleware);
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
