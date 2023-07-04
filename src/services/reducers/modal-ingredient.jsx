import {
  GET_CURRENT_INGREDIENT,
  DEL_CURRENT_INGREDIENT,
  OPEN_MODAL_INGREDIENT,
  CLOSE_MODAL_INGREDIENT,
} from "../actions";

const initialCurrentIngredient = {
  currentIngredient: {},
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
