import { combineReducers } from "redux"
import { modalReducer } from './modal'
import { modalOrderReducer, orderReducer } from './modal-order'
import { modalIngredientReducer, currentIngredientReducer } from './modal-ingredient'
import { allIngredientsReducer } from './all-ingredients'
import { burgerConstructorReducer } from "./burger-constructor"

export const rootReducer = combineReducers({
  modal: modalReducer,
  modalOrder: modalOrderReducer,
  modalIngredient: modalIngredientReducer,
  allItems: allIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer
})