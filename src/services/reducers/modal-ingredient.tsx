import { IIngredientInterface } from "../../utils/ingredient-type";
import { ModalIngredientActionTypes } from "../actions";

interface ICurrentIngredientState {
  currentIngredient: IIngredientInterface | null;
  modalIngredient: boolean;
}

interface GetCurrentIngredientAction {
  type: ModalIngredientActionTypes.GET_CURRENT_INGREDIENT;
  ingredient: IIngredientInterface;
}

interface DelCurrentIngredientAction {
  type: ModalIngredientActionTypes.DEL_CURRENT_INGREDIENT;
}

interface OpenModalIngredientAction {
  type: ModalIngredientActionTypes.OPEN_MODAL_INGREDIENT;
}

interface CloseModalIngredientAction {
  type: ModalIngredientActionTypes.CLOSE_MODAL_INGREDIENT;
}

export type TModalIngredientAction =
  | GetCurrentIngredientAction
  | DelCurrentIngredientAction
  | OpenModalIngredientAction
  | CloseModalIngredientAction;

const initialCurrentIngredient: ICurrentIngredientState = {
  currentIngredient: null,
  modalIngredient: false,
};

export const modalIngredientReducer = (
  state = initialCurrentIngredient,
  action: TModalIngredientAction
): ICurrentIngredientState => {
  switch (action.type) {
    case ModalIngredientActionTypes.OPEN_MODAL_INGREDIENT: {
      return {
        ...state,
        modalIngredient: true,
      };
    }
    case ModalIngredientActionTypes.CLOSE_MODAL_INGREDIENT: {
      return {
        ...state,
        modalIngredient: false,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const currentIngredientReducer = (
  state = initialCurrentIngredient,
  action: TModalIngredientAction
): ICurrentIngredientState => {
  switch (action.type) {
    case ModalIngredientActionTypes.GET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.ingredient,
      };
    }
    case ModalIngredientActionTypes.DEL_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
