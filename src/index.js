import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
// import { compose, createStore, applyMiddleware, getState } from 'redux';
import { rootReducer } from "./services/reducers";
// import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./services/middleware/socket-middleware";
import {
  ORDER_FEED_CONNECT,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_OPEN
} from "./services/actions/order-feed";

const orderFeedMiddleware = socketMiddleware({
  wsConnect: ORDER_FEED_CONNECT,
  wsDisconnect: ORDER_FEED_DISCONNECT,
  wsConnecting: ORDER_FEED_WS_CONNECTING,
  onOpen: ORDER_FEED_WS_OPEN,
  onClose: ORDER_FEED_WS_CLOSE,
  onError: ORDER_FEED_WS_ERROR,
  onMessage: ORDER_FEED_WS_MESSAGE
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderFeedMiddleware);
  }
})


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
