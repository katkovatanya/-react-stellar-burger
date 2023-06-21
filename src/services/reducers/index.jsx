import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_CONSTRUCTOR,
  GET_CURRENT_INGREDIENT,
  DEL_CURRENT_INGREDIENT,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL_INGREDIENT,
  CLOSE_MODAL_INGREDIENT,
  OPEN_MODAL_ORDER,
  CLOSE_MODAL_ORDER,
  ADD_ITEMS,
  ADD_BUN
} from '../actions/index'
import { combineReducers } from "redux"

const initialIngredients = {
  allIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
}

const initialConstructor = {
  constructorIngrediens: {
    items: [],
    bun: {}
  }
}

const initialCurrentIngredient = {
  currentIngredient: {},
}


const initialOrder = {
  order: {},
  orderRequest: false,
  orderFailed: false,
}

const initialState = {
  modal: false,
  modalOrder: false,
  modalIngredient: false
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        modal: true
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modal: false
      };
    }
    default: {
      return state;
    }
  }
}

export const modalOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_ORDER: {
      return {
        ...state,
        modalOrder: true
      };
    }
    case CLOSE_MODAL_ORDER: {
      return {
        ...state,
        modalOrder: false,
        order: {}
      };
    }
    default: {
      return state;
    }
  }
}

export const modalIngredientReducer = (state = initialCurrentIngredient, action) => {
  switch (action.type) {
    case OPEN_MODAL_INGREDIENT: {
      return {
        ...state,
        modalIngredient: true
      };
    }
    case CLOSE_MODAL_INGREDIENT: {
      return {
        ...state,
        modalIngredient: false,
        currentIngredient: {}
      };
    }
    default: {
      return state;
    }
  }
}

export const allIngredientsReducer = (state = initialIngredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        allIngredients: action.data,
        ingredientsRequest: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false
      };
    }
    default: {
      return state;
    }
  }
}

export const currentIngredientReducer = (state = initialCurrentIngredient, action) => {
  switch (action.type) {
    case GET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.ingredient
      };
    }
    case DEL_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {}
      };
    }
    default: {
      return state;
    }
  }
}

export const orderReducer = (state = initialOrder, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        order: {number: 'wait...'}
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      };
    }
    default: {
      return state;
    }
  }
}

export const burgerConstructorReducer = (state = initialConstructor, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        constructorIngrediens: { ...state.constructorIngrediens, bun: action.bun }
      }
    }
    case ADD_ITEMS: {
      return {
        ...state,
        constructorIngrediens: { ...state.constructorIngrediens, items: [...state.constructorIngrediens.items, action.item] }
      }
    }
    case GET_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
}


export const rootReducer = combineReducers({
  modal: modalReducer,
  modalOrder: modalOrderReducer,
  modalIngredient: modalIngredientReducer,
  allItems: allIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer
})