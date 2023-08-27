import { combineReducers } from "redux";
import { modalReducer } from "./modal";
import { orderReducer } from "./modal-order";
import { currentIngredientReducer } from "./modal-ingredient";
import { allIngredientsReducer } from "./all-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { userReducer } from "./user";
import { orderFeedReducer } from "./order-feed";
import { userOrderFeedReducer } from "./user-order-feed";
import { anyOrderReducer } from "./any-order";
import { modalIngredientReducer } from "./modal-ingredient";
import { modalOrderReducer } from "./modal-order";

export const rootReducer = combineReducers({
  modal: modalReducer,
  modalOrder: modalOrderReducer,
  modalIngredient: modalIngredientReducer,
  allItems: allIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  orderFeed: orderFeedReducer,
  userOrderFeed: userOrderFeedReducer,
  anyOrder: anyOrderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
